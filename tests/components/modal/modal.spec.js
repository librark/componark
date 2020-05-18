import { Modal } from '../../../src/components/modal/components/modal'

describe('Modal', () => {
	it('can be rendered with slots', function () {
		const modal = new Modal()
		modal.innerHTML = /* html */ `
      <div>Menu</div>
      <div slot="action">action</div>
    `
		modal.init()
		modal.connectedCallback()

		const content = modal.querySelector('.ark-modal__actions')

		expect(content.childElementCount).toEqual(0)
	})

	it('can be toggle', function () {
		const modal = new Modal()
		modal.init().render().load()

		expect(!modal.hasAttribute('show')).toBeTruthy()

		modal.open()
		expect(modal.hasAttribute('show')).toBeTruthy()

		modal.close()
		expect(!modal.hasAttribute('show')).toBeTruthy()

		modal.toggle()
		expect(modal.hasAttribute('show')).toBeTruthy()

		modal.toggle()
		expect(!modal.hasAttribute('show')).toBeTruthy()
	})

	it('can be open', function () {
		const modal = new Modal()
		modal.init().render().load()

		modal.open()

		const btn = modal.querySelector('.ark-modal__scrim')
		// @ts-ignore
		btn.click()

		expect(!modal.hasAttribute('open')).toBeTruthy()
	})

	it('can be close', function () {
		const modal = new Modal()
		modal.init().render().load()

		modal.close()

		const btn = modal.querySelector('.ark-modal__scrim')
		// @ts-ignore
		btn.click()

		expect(!modal.hasAttribute('close')).toBeTruthy()
	})

	it('can remove attributes', function () {
		const item = new Modal()

		item.setAttribute('name', 'my-item')
		item.setAttribute('id', 'it-1')
		item.setAttribute('title', 'my-title')

		item.setAttributeNode(document.createAttribute('open'))

		item.innerHTML = /* HTML */ ''
		item.connectedCallback()

		expect(!item.getAttribute('open')).toBeTruthy()
	})

	it('can render content null', function () {
		const item = new Modal()
		// @ts-ignore
		expect(item._generateContent(null)).toEqual('')
	})

	it('can set slots', function () {
		const item = new Modal()

		expect(item).toBeTruthy()

		item.slots = undefined
		// @ts-ignore
		item._appendSlots()

		// expect(item.slots).toEqual({})

		item.slots = {}

		// expect(item.slots).toEqual({})

		item.slots = { abc: true }

		// expect(item.slots).toEqual({ abc: true })

		// item.slots = undefined

		// expect(item.slots).toEqual({ abc: true })
		// @ts-ignore
		item._appendSlots()
	})
})
