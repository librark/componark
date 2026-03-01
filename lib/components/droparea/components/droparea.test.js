import { it, mock } from 'node:test'
import assert from 'node:assert/strict'
import './droparea.js'

const createBubbledEvent = (type, props = {}) => {
  const event = new Event(type, {
    bubbles: true
  })
  Object.assign(event, props)
  return event
}

global.URL.createObjectURL = (
  /** @type {(obj: Blob | MediaSource) => string} */ (mock.fn()))

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
  assert.strictEqual(droparea, droparea.init())
})

it('drag files to zone highlights the drop area', () => {
  setup()
  container.innerHTML = /* html */ `
          <ark-droparea></ark-droparea>
      `

  const droparea = container.querySelector('ark-droparea')
  const dropZone = droparea.dropZone
  const dragNode = dropZone

  dragNode.dispatchEvent(
    createBubbledEvent('dragover', {
      clientX: 0,
      clientY: 1
    })
  )
  assert.strictEqual(dropZone.classList['1'], 'highlight')
})

it('drag files outside the zone unhighlight the drop area', () => {
  setup()
  container.innerHTML = /* html */ `
          <ark-droparea></ark-droparea>
      `

  const droparea = container.querySelector('ark-droparea')
  const dropZone = droparea.dropZone

  dropZone.dispatchEvent(
    createBubbledEvent('dragleave', {
      clientX: 0,
      clientY: 1
    })
  )
  assert.strictEqual(dropZone.classList.length, 1)
})

it('Allows dropping multiple files to the component', () => {
  setup()
  container.innerHTML = /* html */ `
          <ark-droparea></ark-droparea>
      `

  const droparea = container.querySelector('ark-droparea')
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
  assert.deepStrictEqual(droparea.fileList[0].name, myFile.name)
  assert.deepStrictEqual(droparea.fileList[1].name, myFile2.name)
})

it('Can recieve a single file', () => {
  setup()
  container.innerHTML = /* html */ `
          <ark-droparea single></ark-droparea>
      `

  const droparea = container.querySelector('ark-droparea')
  const dropZone = droparea.querySelector('.ark-droparea__form')
  const myFile = new File(['image'], 'Snoopy.png', {
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
  assert.strictEqual(droparea.fileList.length, 1)
  assert.ok(!droparea.fileList[1])
})

it('Returns the file list as object URL', () => {
  setup()
  container.innerHTML = /* html */ `
          <ark-droparea></ark-droparea>
      `

  const droparea = container.querySelector('ark-droparea')
  const dropZone = droparea.querySelector('.ark-droparea__form')
  const myFile = new File(['image'], 'Snoopy.png', {
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
  assert.deepStrictEqual(droparea.fileList.length, 2)
})

it('Returns a media list of file metadata objects', () => {
  setup()
  container.innerHTML = /* html */ `
          <ark-droparea></ark-droparea>
      `

  const droparea = container.querySelector('ark-droparea')
  const dropZone = droparea.querySelector('.ark-droparea__form')
  const myFile = new File(['image'], 'Snoopy.png', {
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
  assert.deepStrictEqual(droparea.mediaList.length, 2)
  assert.deepStrictEqual(droparea.mediaList, [
    {
      name: 'Snoopy.png',
      size: 5,
      type: 'image/png',
      url: undefined
    },
    {
      name: 'Scooby.png',
      size: 5,
      type: 'image/png',
      url: undefined
    }
  ])
})

it('Can select files from input', () => {
  setup()
  container.innerHTML = /* html */ `
          <ark-droparea></ark-droparea>
      `

  const droparea = container.querySelector('ark-droparea')
  const dropOpen = droparea.querySelector('.ark-droparea__open')
  const input = droparea.querySelector('.ark-droparea__input')
  const myFile = new File(['image'], 'Snoopy.png', {
    type: 'image/png'
  })
  const changeEvent = createBubbledEvent('change', {})
  Object.defineProperty(changeEvent, 'target', {
    value: {
      files: [myFile]
    }
  })
  dropOpen.click()
  input.dispatchEvent(changeEvent)
  assert.ok(droparea.fileList.length)
})

it('Can limit the file formats that component recieves', () => {
  setup()
  container.innerHTML = /* html */ `
          <ark-droparea accept="jpg, png"></ark-droparea>
      `

  const droparea = container.querySelector('ark-droparea')
  const input = droparea.querySelector('.ark-droparea__input')
  const myFile = new File(['image'], 'Snoopy.jpg', {
    type: 'image/png'
  })
  const myFile2 = new File(['image'], 'Scrappy.png', {
    type: 'image/png'
  })
  const changeEvent = createBubbledEvent('change', {})
  Object.defineProperty(changeEvent, 'target', {
    value: {
      files: [myFile, myFile2]
    }
  })

  input.dispatchEvent(changeEvent)
  assert.ok(droparea.fileList.length)
})

it("Does not allow dropping a file that doesn't not exist in accept'", () => {
  setup()
  container.innerHTML = /* html */ `
          <ark-droparea accept="jpg, png"></ark-droparea>
      `

  const droparea = container.querySelector('ark-droparea')
  const input = droparea.querySelector('.ark-droparea__input')
  const myFile = new File(['text'], 'Snoopy.txt', {
    type: 'text/txt'
  })
  const changeEvent = createBubbledEvent('change', {})
  Object.defineProperty(changeEvent, 'target', {
    value: {
      files: [myFile]
    }
  })
  input.dispatchEvent(changeEvent)
  assert.ok(!droparea.fileList.length)
})

it("General file type values can be specified'", () => {
  setup()
  container.innerHTML = /* html */ `
          <ark-droparea accept="audio, image, video, text">
          </ark-droparea>
      `

  const droparea = container.querySelector('ark-droparea')
  const dropZone = droparea.querySelector('.ark-droparea__form')
  const myFile = new File(['audio'], 'autechre.mp3', {
    type: 'audio/mp3'
  })
  const myFile2 = new File(['video'], 'cats.mov', {
    type: 'video/mov'
  })
  const myFile3 = new File(['image'], 'snoopy.jpg', {
    type: 'image/jpg'
  })
  const myFile4 = new File(['text'], 'styles.css', {
    type: 'text/css'
  })

  const files = [myFile, myFile2, myFile3, myFile4]
  const dropEvent = createBubbledEvent('drop', {
    clientX: 0,
    clientY: 1,
    dataTransfer: {
      files
    }
  })
  dropZone.dispatchEvent(dropEvent)

  droparea.fileList.forEach((file, i) => {
    assert.strictEqual(file.type, files[i].type)
  })
})

it('Size of files can be limited', () => {
  setup()
  container.innerHTML = /* html */ `
          <ark-droparea max-size= "2"></ark-droparea>
      `

  const droparea = container.querySelector('ark-droparea')
  const dropZone = droparea.querySelector('.ark-droparea__form')
  const myFile = new File(['image'], 'Doggy.png', {
    type: 'image/png'
  })
  const myFile2 = new File(['image'], 'Scooby.png', {
    type: 'image/png'
  })
  Object.defineProperty(myFile2, 'size', { value: 1024 * 1024 + 1 })

  const dropEvent = createBubbledEvent('drop', {
    clientX: 0,
    clientY: 1,
    dataTransfer: {
      files: [myFile, myFile2]
    }
  })

  const maxSizeValidateSpy = mock.method(droparea, 'maxSizeValidate')
  droparea.maxSizeValidate([])
  droparea.maxSizeValidate(myFile2)
  dropZone.dispatchEvent(dropEvent)
  assert.ok(maxSizeValidateSpy.mock.calls.length > 0)
  maxSizeValidateSpy.mock.restore()
})


it('allows to be passed a custom input element', () => {
  setup()
  container.innerHTML = /* html */ `
    <ark-droparea single>
      <input data-custom-input style="font-weight:bold" type="file">
    </ark-droparea>
  `

  const droparea = container.querySelector('ark-droparea')
  const input = droparea.querySelector('[data-custom-input]')
  assert.ok(input)
  assert.deepStrictEqual(input.style.fontWeight, 'bold')
  const dropZone = droparea.querySelector('.ark-droparea__form')
  const myFile = new File(['image'], 'Snoopy.png', {
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
  assert.strictEqual(droparea.fileList.length, 1)
  assert.ok(!droparea.fileList[1])
})
