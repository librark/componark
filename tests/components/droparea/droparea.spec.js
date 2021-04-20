import { Droparea } from 'components/droparea'

describe('Droparea', () => {
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

        const element = container.querySelector('ark-droparea')
        expect(element).toBe(element.init())
    })




})