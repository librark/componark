import { Droparea } from 'components/droparea'

describe('Droparea', () => {
    const file = new File([""], "myimage.png", {
        type: "image/png"
    })

    // const mockDragEvent = new window.Event("dragenter")
    // Object.defineProperty(event,"dataTransfer",{
    //     value: {
    //         files: [file], 
    //     }
    // })
    const createBubbledEvent = (type, props = {}) =>{
        const event = new Event(type, {bubbles: true})
        Object.assign(event,props)
        return event
    }

   let container = null;

    
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

        const droparea= container.querySelector('ark-droparea')
        expect(droparea).toBe(droparea.init())
    })

    it('drag files to zone highlights the drop area', () => {
        container.innerHTML = /* html */ `
            <ark-droparea></ark-droparea>
        `
   
        const droparea= container.querySelector('ark-droparea')
        const dropZone= droparea.dropZone
        const dragNode = dropZone
        
        dragNode.dispatchEvent(
            createBubbledEvent("dragover", {clientX:0, clientY:1})
        )
        expect(dropZone.classList['1']).toBe('highlight')
    })

     it('drag files outside the zone unhighlight the drop area', () => {
        container.innerHTML = /* html */ `
            <ark-droparea></ark-droparea>
        `
   
        const droparea= container.querySelector('ark-droparea')
        const dropZone= droparea.dropZone
        const dragNode = dropZone
        
        dragNode.dispatchEvent(
            createBubbledEvent("dragleave", {clientX:0, clientY:1})
        )
        expect(dropZone.classList.length).toBe(1)
    })



})
