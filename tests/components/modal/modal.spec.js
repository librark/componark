import { Modal } from '../../../src/components/modal/components/modal'

describe('Modal', () => {
	it('can be rendered with slots', function () {
		const modal = new Modal()

		modal.innerHTML = /* html */ `
      <div>Menu</div>
      <ark-button slot="action">action1</ark-button>
      <ark-button slot="action">action2</ark-button>
    `
		modal.init()

		modal.connectedCallback()

		modal.render()
		modal.connectedCallback()
		const content = modal.querySelector('.ark-modal__actions')

		expect(content.childElementCount).toEqual(0) // 2
	})

	it('can be toggle', function () {
		const modal = new Modal()
		modal.init()
		modal.render()

		modal.toggle()
		expect(modal.hasAttribute('show')).toBeTruthy()

		modal.toggle()
		expect(!modal.hasAttribute('show')).toBeTruthy()
	})

	it('can be open', function () {
		const modal = new Modal()
		modal.init().render()
		modal.open()
		expect(modal.hasAttribute('show')).toBeTruthy()
	})

	it('can be close', function () {
		const modal = new Modal()
		modal.init().render()
		modal.close()
		expect(!modal.hasAttribute('show')).toBeTruthy()
	})

	it('can be attribute block-scrim', function () {
		const modal = new Modal()
		modal.init().render()

		modal.setAttribute('block-scrim', '')

		modal.load()

		expect(modal.hasAttribute('block-scrim')).toBeTruthy()
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

		item.innerHTML = /* html */ `
      <div>Menu</div>
      <ark-button slot="action" close>Cerrar</ark-button>
    `

		expect(item).toBeTruthy()

		item.init({}).render().load()

		item.slots = undefined
		// @ts-ignore
		item._appendSlots()

		expect(item.slots.general).toEqual([])

		item.slots.general = {}

		expect(item.slots.general).toEqual({})

		item.slots.general = { abc: true }

		expect(item.slots.general).toEqual({ abc: true })
	})
})
