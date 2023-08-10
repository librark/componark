import { jest } from '@jest/globals'
import './droparea.js'

describe('Droparea', () => {
  const createBubbledEvent = (type, props = {}) => {
    const event = new Event(type, {
      bubbles: true
    })
    Object.assign(event, props)
    return event
  }

  global.URL.createObjectURL = jest.fn()

  let container = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it('can be instantiated', () => {
    container.innerHTML = /* html */ `
            <ark-droparea></ark-droparea>
        `

    const droparea = container.querySelector('ark-droparea')
    expect(droparea).toBe(droparea.init())
  })

  it('drag files to zone highlights the drop area', () => {
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
    expect(dropZone.classList['1']).toBe('highlight')
  })

  it('drag files outside the zone unhighlight the drop area', () => {
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
    expect(dropZone.classList.length).toBe(1)
  })

  it('Allows dropping multiple files to the component', () => {
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
    expect(droparea.fileList[0].name).toEqual(myFile.name)
    expect(droparea.fileList[1].name).toEqual(myFile2.name)
  })

  it('Can recieve a single file', () => {
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
    expect(droparea.fileList.length).toBe(1)
    expect(droparea.fileList[1]).toBeFalsy()
  })

  it('Returns the file list as object URL', () => {
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
    expect(droparea.fileList.length).toEqual(2)
  })

  it('Returns a media list of file metadata objects', () => {
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
    expect(droparea.mediaList.length).toEqual(2)
    expect(droparea.mediaList).toEqual([
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
    expect(droparea.fileList.length).toBeTruthy()
  })

  it('Can limit the file formats that component recieves', () => {
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
    expect(droparea.fileList.length).toBeTruthy()
  })

  it("Does not allow dropping a file that doesn't not exist in accept'", () => {
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
    expect(droparea.fileList.length).toBeFalsy()
  })

  it("General file type values can be specified'", () => {
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
      expect(file.type).toBe(files[i].type)
    })
  })

  it('Size of files can be limited', () => {
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

    droparea.maxSizeValidate([])
    droparea.maxSizeValidate(myFile2)
    dropZone.dispatchEvent(dropEvent)
    expect(droparea.maxSizeValidate).toBeCalled
  })
})
