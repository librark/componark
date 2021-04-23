import { Droparea } from "components/droparea"

const FileReaderMock = /** @class */ (function () {
  function FileReaderMock() {
    this.DONE = FileReader.DONE
    this.EMPTY = FileReader.EMPTY
    this.LOADING = FileReader.LOADING
    this.readyState = 0
    this.error = null
    this.result = null
    this.abort = jest.fn()
    this.addEventListener = jest.fn()
    this.dispatchEvent = jest.fn()
    this.onabort = jest.fn()
    this.onerror = jest.fn()
    this.onload = jest.fn()
    this.onloadend = jest.fn()
    this.onloadprogress = jest.fn()
    this.onloadstart = jest.fn()
    this.onprogress = jest.fn()
    this.readAsArrayBuffer = jest.fn()
    this.readAsBinaryString = jest.fn()
    this.readAsDataURL = jest.fn()
    this.readAsText = jest.fn()
    this.removeEventListener = jest.fn()
  }
  return FileReaderMock
})()

describe("Droparea", () => {
  const file = new File([new ArrayBuffer(1)], "file.jpg")
  const fileReader = new FileReaderMock()
  jest.spyOn(window, "FileReader").mockImplementation(() => fileReader)

  const createBubbledEvent = (type, props = {}) => {
    const event = new Event(type, { bubbles: true })
    Object.assign(event, props)
    return event
  }

  let container = null

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
    jest.clearAllMocks()
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
      createBubbledEvent("dragover", { clientX: 0, clientY: 1 })
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
      createBubbledEvent("dragleave", { clientX: 0, clientY: 1 })
    )
    expect(dropZone.classList.length).toBe(1)
  })

  it("temporal test", () => {
    container.innerHTML = /* html */ `
            <ark-droparea></ark-droparea>
        `

    const droparea = container.querySelector("ark-droparea")
    const input = droparea.querySelector(".ark-droparea__input")
    const dropZone = droparea.querySelector(".ark-droparea__form")
    const myFile = new File(["image"], "myimage.png", {
      type: "image/png",
    })

    // const testStorage = new Map()
    // const testEvent = {
    //   dataTransfer: {
    //     setData: (key, value) => testStorage.set(key, value),
    //     getData: (key) => testStorage.get(key),
    //   },
    // }
    // spyOn(testEvent.dataTransfer, "getData").and.callThrough()
    const dropEvent = createBubbledEvent("drop", {
      clientX: 0,
      clientY: 1,
      dataTransfer: { files: [file] },
    })

    // Object.defineProperty(dropEvent, "dataTransfer", {
    //   value: {
    //     files: [myFile],
    //   },
    // })

    dropZone.dispatchEvent(dropEvent)
    // droparea.addEventListener("click", droparea.previewFile(myFile))
    // droparea.click()

    const changeEvent = createBubbledEvent("change", {})
    Object.defineProperty(changeEvent, "files", { value: [file] })
    input.dispatchEvent(changeEvent)
  })
})
