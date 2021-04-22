import { Droparea } from "components/droparea"

describe("Droparea", () => {

  const createBubbledEvent = (type, props = {}) => {
    const event = new Event(type, { bubbles: true })
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
    const dropZone = droparea.querySelector('.ark-droparea__form')
    const dropGallery = droparea.querySelector(".ark-droparea__gallery")
    const myFile = new File(["image"], "myimage.png", {
      type: "image/png",
    })

    const testStorage = new Map();
    const testEvent = {
      dataTransfer:{ 
        setData: (key, value) =>testStorage.set(key, value),
        getData: (key) => testStorage.get(key)
      }
    }
    spyOn(testEvent.dataTransfer, 'getData').and.callThrough();
    const dropEvent = createBubbledEvent("drop", {
        clientX: 0,
        clientY: 1,
        dataTransfer: testEvent.dataTransfer,
      })

      
      Object.defineProperty(dropEvent, "dataTransfer", {
        value: {
          files: [myFile]
        }
      })
      
      dropZone.dispatchEvent(dropEvent)
      droparea.addEventListener('click',droparea.previewFile(myFile))
      droparea.click()
      droparea.returnFiles()
    })
})
