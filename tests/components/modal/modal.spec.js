/** @typedef {import('../../../src/components').Modal} Modal */
import '../../../src/components/modal'

describe('Modal', () => {
	it('can be instantiated', () => {
		const modal = /** @type {Modal} */ (document.createElement('ark-modal'))
		expect(modal).toBeTruthy()

		var init = modal.init()
		expect(modal === init).toBeTruthy()
	})

	it('can be rendered with slots', function () {
		const modal = /** @type {Modal} */ (document.createElement('ark-modal'))
		modal.innerHTML = /* HTML */ `
      <div>Menu</div>
      <div slot="action">action</div>
    `
		modal.init({})
		modal.connectedCallback()

		const content = modal.querySelector('.ark-modal__actions')
		expect(content.childElementCount).toBeTruthy()
	})

	it('can be open', function () {
		const modal = /** @type {Modal} */ (document.createElement('ark-modal'))
		modal.connectedCallback()
		modal.open()

		const btn = modal.querySelector('[close]')
		// @ts-ignore
		btn.click()

		expect(!modal.hasAttribute('open')).toBeTruthy()
	})

	it('can be open', function () {
		const modal = /** @type {Modal} */ (document.createElement('ark-modal'))
		modal.connectedCallback()
		modal.open()

		const btn = modal.querySelector('.ark-modal__scrim')
		// @ts-ignore
		btn.click()

		expect(!modal.hasAttribute('open')).toBeTruthy()
	})

	it('can be open by method', function () {
		const modal = /** @type {Modal} */ (document.createElement('ark-modal'))
		modal.connectedCallback()
		modal.open()

		expect(modal.hasAttribute('open')).toBeTruthy()
	})

	it('can be open by toggle method', function () {
		const modal = /** @type {Modal} */ (document.createElement('ark-modal'))
		modal.connectedCallback()

		modal.open()
		expect(modal.hasAttribute('open')).toBeTruthy()

		modal.toggle()
		expect(!modal.hasAttribute('open')).toBeTruthy()

		modal.toggle()
		expect(modal.hasAttribute('open')).toBeTruthy()
	})

	it('can remove attributes', function () {
		const item = /** @type {Modal} */ (document.createElement('ark-modal'))

		item.setAttribute('name', 'my-item')
		item.setAttribute('id', 'it-1')
		item.setAttribute('title', 'my-title')

		item.setAttributeNode(document.createAttribute('open'))

		item.innerHTML = /* HTML */ ``
		item.connectedCallback()

		expect(!item.getAttribute('open')).toBeTruthy()
	})

	it('can render content null', function () {
		const item = /** @type {Modal} */ (document.createElement('ark-modal'))
		// @ts-ignore
		expect(item._generateContent(null)).toEqual('')
	})

	it('can render header', function () {
		const item = /** @type {Modal} */ (document.createElement('ark-modal'))

		// @ts-ignore
		expect(item._renderHeader()).toEqual('')

		// @ts-ignore
		item.title = 'title'
		// @ts-ignore
		item.subtitle = 'subtitle'

		// @ts-ignore
		expect(item._renderHeader().length).toBeTruthy()
	})

	it('can set slots', function () {
		const item = /** @type {Modal} */ (document.createElement('ark-modal'))

		item['slots'] = undefined
		// @ts-ignore
		item._appendSlots()

		expect(item['slots']).toEqual({})

		item['slots'] = {}

		expect(item['slots']).toEqual({})

		item['slots'] = { abc: true }

		expect(item['slots']).toEqual({ abc: true })

		item['slots'] = undefined

		expect(item['slots']).toEqual({ abc: true })
		// @ts-ignore
		item._appendSlots()
	})
})
