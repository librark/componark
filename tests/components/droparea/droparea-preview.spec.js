import { DropareaPreview } from "../../../src/components/droparea/components/droparea-preview"

describe("Droparea", () => {
  const createBubbledEvent = (type, props = {}) => {
    const event = new Event(type, {
      bubbles: true,
    })
    Object.assign(event, props)
    return event
  }

  global.URL.createObjectURL = jest.fn()

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
    const preview = droparea.querySelector("ark-droparea-preview")
    expect(preview).toBe(preview.init())
  })

  it("Item can be removed", () => {
    container.innerHTML = /* html */ `
            <ark-droparea></ark-droparea>
        `

    const droparea = container.querySelector("ark-droparea")
    const preview = droparea.querySelector("[data-preview-list]")
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
    preview.querySelector("button").click()
    preview.querySelector("button").click()
  })
})
