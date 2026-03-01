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

global.URL.createObjectURL = (
  /** @type {(obj: Blob | MediaSource) => string} */ (mock.fn()))
global.document.elementFromPoint = (
  /** @type {(x: number, y: number) => Element} */ (mock.fn()))

let container = null

const setup = () => {
  document.body.innerHTML = ''
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
