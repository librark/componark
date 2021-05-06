import {
    DropareaPreview
} from '../../../src/components/droparea/components/droparea-preview'

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
        const gallery = droparea.querySelector(".ark-droparea-gallery")
        expect(gallery).toBe(gallery.init())
    })

    xit("Item can be removed", () => {
        container.innerHTML = /* html */ `
            <ark-droparea></ark-droparea>
        `

        const droparea = container.querySelector("ark-droparea")
        const gallery = droparea.querySelector(".ark-droparea-gallery")
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
        console.log(gallery.innerHTML)
    })

})