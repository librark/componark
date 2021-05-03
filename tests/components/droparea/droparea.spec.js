import { Droparea } from "components/droparea"

describe("Droparea", () => {
  const createBubbledEvent = (type, props = {}) => {
    const event = new Event(type, {
      bubbles: true,
    })
    Object.assign(event, props)
    return event
  }

  let container = null

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it("can be instantiated", () => {
    container.innerHTML = /* html */ `
            <ark-droparea></ark-droparea>
        `

    const droparea = container.querySelector("ark-droparea")
    expect(droparea).toBe(droparea.init())
  })

  it("drag files to zone highlights the drop area", () => {
    container.innerHTML = /* html */ `
            <ark-droparea></ark-droparea>
        `

    const droparea = container.querySelector("ark-droparea")
    const dropZone = droparea.dropZone
    const dragNode = dropZone

    dragNode.dispatchEvent(
      createBubbledEvent("dragover", {
        clientX: 0,
        clientY: 1,
      })
    )
    expect(dropZone.classList["1"]).toBe("highlight")
  })

  it("drag files outside the zone unhighlight the drop area", () => {
    container.innerHTML = /* html */ `
            <ark-droparea></ark-droparea>
        `

    const droparea = container.querySelector("ark-droparea")
    const dropZone = droparea.dropZone

    dropZone.dispatchEvent(
      createBubbledEvent("dragleave", {
        clientX: 0,
        clientY: 1,
      })
    )
    expect(dropZone.classList.length).toBe(1)
  })

  it("Allows dropping multiple files to the component", () => {
    container.innerHTML = /* html */ `
            <ark-droparea></ark-droparea>
        `

    const droparea = container.querySelector("ark-droparea")
    const dropZone = droparea.querySelector(".ark-droparea__form")
    const myFile = new File(["image"], "Doggy.png", {
      type: "image/png",
    })
    const myFile2 = new File(["image"], "Scooby.png", {
      type: "image/png",
    })
    const dropEvent = createBubbledEvent("drop", {
      clientX: 0,
      clientY: 1,
      dataTransfer: {
        files: [myFile, myFile2],
      },
    })

    dropZone.dispatchEvent(dropEvent)
    expect(droparea.fileList[0].name).toEqual(myFile.name)
    expect(droparea.fileList[1].name).toEqual(myFile2.name)
  })
  it("Can recieve a single file", () => {
    container.innerHTML = /* html */ `
            <ark-droparea single></ark-droparea>
        `

    const droparea = container.querySelector("ark-droparea")
    const dropZone = droparea.querySelector(".ark-droparea__form")
    const myFile = new File(["image"], "Snoopy.png", {
      type: "image/png",
    })
    const myFile2 = new File(["image"], "Scooby.png", {
      type: "image/png",
    })

    const dropEvent = createBubbledEvent("drop", {
      clientX: 0,
      clientY: 1,
      dataTransfer: {
        files: [myFile, myFile2],
      },
    })

    dropZone.dispatchEvent(dropEvent)
    expect(droparea.files[0]).toEqual(droparea.fileList[0])
    expect(droparea.files[1]).toBeFalsy()
  })

  it("Returns the file list", () => {
    container.innerHTML = /* html */ `
            <ark-droparea></ark-droparea>
        `

    const droparea = container.querySelector("ark-droparea")
    const dropZone = droparea.querySelector(".ark-droparea__form")
    const myFile = new File(["image"], "Snoopy.png", {
      type: "image/png",
    })
    const myFile2 = new File(["image"], "Scooby.png", {
      type: "image/png",
    })

    const dropEvent = createBubbledEvent("drop", {
      clientX: 0,
      clientY: 1,
      dataTransfer: {
        files: [myFile, myFile2],
      },
    })

    dropZone.dispatchEvent(dropEvent)
    expect(droparea.files.length).toEqual(droparea.fileList.length)
  })

  it("Can select files from input", () => {
    container.innerHTML = /* html */ `
            <ark-droparea></ark-droparea>
        `

    const droparea = container.querySelector("ark-droparea")
    const input = droparea.querySelector(".ark-droparea__input")
    const myFile = new File(["image"], "Snoopy.png", {
      type: "image/png",
    })
    const changeEvent = createBubbledEvent("change", {})
    Object.defineProperty(changeEvent, "target", {
      value: {
        files: [myFile],
      },
    })
    droparea.click()
    input.dispatchEvent(changeEvent)

    expect(droparea.files.length).toBeTruthy()
  })

  it("Can limit the file formats that component recieves", () => {
    container.innerHTML = /* html */ `
            <ark-droparea accept=".jpg, .png"></ark-droparea>
        `

    const droparea = container.querySelector("ark-droparea")
    const input = droparea.querySelector(".ark-droparea__input")
    const myFile = new File(["image"], "Snoopy.jpg", {
      type: "image/png",
    })
    const myFile2 = new File(["image"], "Scrappy.png", {
      type: "image/png",
    })
    const changeEvent = createBubbledEvent("change", {})
    Object.defineProperty(changeEvent, "target", {
      value: {
        files: [myFile, myFile2],
      },
    })
    input.dispatchEvent(changeEvent)

    expect(droparea.files.length).toBeTruthy()
    droparea.files.forEach((file) => console.log(file.size))
  })
  it("Does not allow dropping a file that doesn't not exist in accept'", () => {
    container.innerHTML = /* html */ `
            <ark-droparea accept=".jpg, .png"></ark-droparea>
        `

    const droparea = container.querySelector("ark-droparea")
    const input = droparea.querySelector(".ark-droparea__input")
    const myFile = new File(["text"], "Snoopy.txt", {
      type: "text/txt",
    })
    const myFile2 = new File(["text"], "styles.css", {
      type: "text/css",
    })
    const changeEvent = createBubbledEvent("change", {})
    Object.defineProperty(changeEvent, "target", {
      value: {
        files: [myFile, myFile2],
      },
    })
    input.dispatchEvent(changeEvent)
    expect(droparea.files.length).toBeFalsy()
  })
})
