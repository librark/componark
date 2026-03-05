import { it, mock } from 'node:test'
import assert from 'node:assert/strict'
import './droparea-preview.js'

const createBubbledEvent = (type, props = {}) => {
  const event = new Event(type, {
    bubbles: true
  })
  Object.assign(event, props)
  return event
}

let objectURLCount = 0
global.URL.createObjectURL = (
  /** @type {(obj: Blob | MediaSource) => string} */ (
    mock.fn(() => `mock://data/url/${objectURLCount++}`)))
global.URL.revokeObjectURL = (
  /** @type {(url: string) => void} */ (mock.fn()))
global.document.elementFromPoint = (
  /** @type {(x: number, y: number) => Element} */ (mock.fn()))

let container = null

const setup = () => {
  document.body.innerHTML = ''
  objectURLCount = 0
  global.URL.createObjectURL.mock.resetCalls()
  global.URL.revokeObjectURL.mock.resetCalls()
  container = document.createElement('div')
  document.body.appendChild(container)
}

it('can be instantiated', () => {
  setup()
  container.innerHTML = /* html */ `
          <ark-droparea></ark-droparea>
      `
  const droparea = container.querySelector('ark-droparea')
  const preview = droparea.querySelector('ark-droparea-preview')
  assert.strictEqual(preview, preview.init())
})

it('Item can be removed', () => {
  setup()
  container.innerHTML = /* html */ `
          <ark-droparea></ark-droparea>
      `

  const droparea = container.querySelector('ark-droparea')
  const preview = droparea.querySelector('[data-preview-list]')
  const dropZone = droparea.querySelector('.ark-droparea__form')
  const myFile = new File(['image'], 'Doggy.png', {
    type: 'image/png'
  })
  const myFile2 = new File(['image'], 'Scooby.png', {
    type: 'image/png'
  })
  const dropEvent = createBubbledEvent('drop', {
    clientX: 0,
    clientY: 1,
    dataTransfer: {
      files: [myFile, myFile2]
    }
  })

  dropZone.dispatchEvent(dropEvent)
  preview.querySelector('button').click()
  preview.querySelector('button').click()
})

it('Can drag previews and sort a new list', () => {
  setup()
  container.innerHTML = /* html */ `
          <ark-droparea></ark-droparea>
      `

  const droparea = container.querySelector('ark-droparea')
  const preview = droparea.querySelector('[data-preview-list]')
  const dropZone = droparea.querySelector('.ark-droparea__form')
  const myFile = new File(['image'], 'Doggy.png', {
    type: 'image/png'
  })
  const myFile2 = new File(['image'], 'Scooby.png', {
    type: 'image/png'
  })
  const dropEvent = createBubbledEvent('drop', {
    clientX: 0,
    clientY: 1,
    dataTransfer: {
      files: [myFile, myFile2]
    }
  })

  dropZone.dispatchEvent(dropEvent)

  preview.handleDrag = mock.fn()

  const getThumbnails = () =>
    Array.from(preview.querySelectorAll('.ark-droparea-preview__frame'))

  const thumbnails = getThumbnails()

  const startingNode = thumbnails[0]
  const endingNode = thumbnails[1]

  startingNode.dispatchEvent(
    createBubbledEvent('dragstart', { clientX: 0, clientY: 0 })
  )
  endingNode.dispatchEvent(
    createBubbledEvent('dragend', { clientX: 0, clientY: 1 })
  )
})

it('handleDrag keeps the selected item when elementFromPoint returns null', () => {
  setup()
  const preview = document.createElement('ark-droparea-preview')
  const list = document.createElement('ul')
  const firstItem = document.createElement('li')
  const secondItem = document.createElement('li')
  list.append(firstItem, secondItem)
  preview.appendChild(list)
  document.body.appendChild(preview)

  const originalElementFromPoint = document.elementFromPoint
  document.elementFromPoint = () => null

  preview.handleDrag(firstItem, { clientX: 0, clientY: 0 })

  assert.ok(firstItem.classList.contains('drag-sort-active'))
  assert.strictEqual(list.firstElementChild, firstItem)

  document.elementFromPoint = originalElementFromPoint
})

it('handleDrag moves the selected item after its next sibling', () => {
  setup()
  const preview = document.createElement('ark-droparea-preview')
  const list = document.createElement('ul')
  const firstItem = document.createElement('li')
  const secondItem = document.createElement('li')
  const thirdItem = document.createElement('li')
  list.append(firstItem, secondItem, thirdItem)
  preview.appendChild(list)
  document.body.appendChild(preview)

  const originalElementFromPoint = document.elementFromPoint
  document.elementFromPoint = () => secondItem

  preview.handleDrag(firstItem, { clientX: 1, clientY: 1 })

  assert.strictEqual(list.children[0], secondItem)
  assert.strictEqual(list.children[1], firstItem)
  assert.strictEqual(list.children[2], thirdItem)

  document.elementFromPoint = originalElementFromPoint
})

it('does not add duplicate drag listeners to existing previews', () => {
  setup()
  const counts = new WeakMap()
  const originalAddEventListener = Element.prototype.addEventListener
  Element.prototype.addEventListener = function (type, listener, options) {
    const isDragEvent = type === 'drag' || type === 'dragend'
    if (this.tagName === 'LI' && isDragEvent) {
      const itemCounts = counts.get(this) || { drag: 0, dragend: 0 }
      itemCounts[type] += 1
      counts.set(this, itemCounts)
    }

    return originalAddEventListener.call(this, type, listener, options)
  }

  try {
    container.innerHTML = /* html */ `
      <ark-droparea></ark-droparea>
    `
    const droparea = container.querySelector('ark-droparea')
    const dropZone = droparea.querySelector('.ark-droparea__form')

    const firstBatch = createBubbledEvent('drop', {
      dataTransfer: { files: [new File(['image'], 'Doggy.png', { type: 'image/png' })] }
    })
    const secondBatch = createBubbledEvent('drop', {
      dataTransfer: { files: [new File(['image'], 'Scooby.png', { type: 'image/png' })] }
    })

    dropZone.dispatchEvent(firstBatch)
    dropZone.dispatchEvent(secondBatch)

    const firstItem = droparea.querySelector('.ark-droparea-preview__frame')
    const itemCounts = counts.get(firstItem)

    assert.deepStrictEqual(itemCounts.drag, 1)
    assert.deepStrictEqual(itemCounts.dragend, 1)
  } finally {
    Element.prototype.addEventListener = originalAddEventListener
  }
})

it('reuses object URLs for the media list and revokes on file removal', () => {
  setup()
  container.innerHTML = /* html */ `
    <ark-droparea></ark-droparea>
  `
  const droparea = container.querySelector('ark-droparea')
  const dropZone = droparea.querySelector('.ark-droparea__form')
  const myFile = new File(['image'], 'Doggy.png', {
    type: 'image/png'
  })

  dropZone.dispatchEvent(createBubbledEvent('drop', {
    dataTransfer: { files: [myFile] }
  }))

  const callsBeforeMediaRead = global.URL.createObjectURL.mock.calls.length
  const mediaUrl = droparea.mediaList[0].url
  const mediaUrlSecondRead = droparea.mediaList[0].url

  assert.deepStrictEqual(mediaUrl, mediaUrlSecondRead)
  assert.deepStrictEqual(
    global.URL.createObjectURL.mock.calls.length,
    callsBeforeMediaRead
  )

  droparea.querySelector('.ark-droparea__remove').click()
  assert.deepStrictEqual(
    global.URL.revokeObjectURL.mock.calls[0].arguments[0],
    mediaUrl
  )
})

it('returns early when handleDrop runs outside a droparea component', () => {
  setup()
  const preview = document.createElement('ark-droparea-preview')
  const target = document.createElement('li')
  preview.appendChild(target)
  document.body.appendChild(preview)

  assert.doesNotThrow(() => {
    preview.handleDrop({ target })
  })
})

it('returns early when removing a file that does not exist', () => {
  setup()
  container.innerHTML = /* html */ `
    <ark-droparea></ark-droparea>
  `
  const droparea = container.querySelector('ark-droparea')
  const preview = droparea.preview
  const button = document.createElement('button')
  const frame = document.createElement('li')
  frame.appendChild(button)
  preview.select('[data-preview-list]').appendChild(frame)

  const unknownFile = new File(['image'], 'unknown.png', { type: 'image/png' })

  assert.doesNotThrow(() => {
    preview.removeFile(unknownFile, { target: button })
  })
  assert.ok(preview.select('[data-preview-list]').contains(frame))
})

it('skips drag listeners for already-enabled items', () => {
  setup()
  const preview = document.createElement('ark-droparea-preview')
  const item = document.createElement('li')
  item.setAttribute('data-drag-enabled', '')
  let calls = 0
  const originalAddEventListener = item.addEventListener
  item.addEventListener = function (...args) {
    calls += 1
    return originalAddEventListener.apply(this, args)
  }

  preview.enableDragItem(item)

  assert.deepStrictEqual(calls, 0)
})

it('does nothing when revoking a file without an object URL', () => {
  setup()
  const preview = document.createElement('ark-droparea-preview')
  const file = new File(['image'], 'Snoopy.png', { type: 'image/png' })

  assert.doesNotThrow(() => {
    preview.revokeFile(file)
  })
})

it('renders a text preview in single mode and clears previous preview items', () => {
  setup()
  container.innerHTML = /* html */ `
    <ark-droparea single></ark-droparea>
  `
  const droparea = container.querySelector('ark-droparea')
  const dropZone = droparea.querySelector('.ark-droparea__form')
  const firstFile = new File(['first'], 'first.txt', { type: 'text/plain' })
  const secondFile = new File(['second'], 'second.txt', { type: 'text/plain' })

  dropZone.dispatchEvent(createBubbledEvent('drop', {
    dataTransfer: { files: [firstFile] }
  }))

  const firstPreviewItem = droparea.preview.querySelector('li')
  assert.deepStrictEqual(firstPreviewItem.querySelector('p').textContent, 'first.txt')
  assert.ok(firstPreviewItem.getAttribute('data').includes('mock://data/url/'))
  assert.strictEqual(firstPreviewItem.getAttribute('index'), null)

  dropZone.dispatchEvent(createBubbledEvent('drop', {
    dataTransfer: { files: [secondFile] }
  }))

  const frames = droparea.preview.querySelectorAll('li')
  assert.deepStrictEqual(frames.length, 1)
  assert.deepStrictEqual(frames[0].querySelector('p').textContent, 'second.txt')
})

it('clearPreview tolerates missing preview list nodes', () => {
  setup()
  const preview = document.createElement('ark-droparea-preview')
  const originalSelect = preview.select
  preview.select = () => null
  preview.toggleVisibility = () => {}

  assert.doesNotThrow(() => {
    preview.clearPreview()
  })

  preview.select = originalSelect
})

it('returns early when handleDrop receives a null target', () => {
  setup()
  const preview = document.createElement('ark-droparea-preview')

  assert.doesNotThrow(() => {
    preview.handleDrop({ target: null })
  })
})

it('returns early when removeFile receives a null target', () => {
  setup()
  const preview = document.createElement('ark-droparea-preview')
  const file = new File(['image'], 'Nully.png', { type: 'image/png' })

  assert.doesNotThrow(() => {
    preview.removeFile(file, { target: null })
  })
})

it('revokeFile and revokeAllFiles tolerate missing revokeObjectURL', () => {
  setup()
  const preview = document.createElement('ark-droparea-preview')
  const file = new File(['one'], 'one.txt', { type: 'text/plain' })
  const secondFile = new File(['two'], 'two.txt', { type: 'text/plain' })
  preview._objectUrls.set(file, 'mock://data/url/a')
  preview._objectUrls.set(secondFile, 'mock://data/url/b')

  const originalRevoke = global.URL.revokeObjectURL
  global.URL.revokeObjectURL = undefined

  try {
    assert.doesNotThrow(() => {
      preview.revokeFile(file)
      preview.revokeAllFiles()
    })
  } finally {
    global.URL.revokeObjectURL = originalRevoke
  }
})
