/** @typedef {import('../../../src/components').Tabs} Tabs */
import '../../../src/components/tabs'

describe('Tabs Item', () => {
	it('can be instantiated', () => {
		const item = /** @type {Tabs} */ (document.createElement('ark-tabs-item'))
		expect(item).toBeTruthy()

		var init = item.init({})
		expect(item === init).toBeTruthy()
	})

	it('can be rendered with content', function () {
		const item = /** @type {Tabs} */ (document.createElement('ark-tabs-item'))
		item.setAttribute('id', 'item-1')

		item.innerHTML = /* HTML */ `
      <span>item-1</span>
    `
		item.connectedCallback()

		expect(item.getAttribute('id') === 'item-1').toBeTruthy()
	})

	it('can remove attributes', function () {
		const item = /** @type {Tabs} */ (document.createElement('ark-tabs-item'))

		item.setAttribute('name', 'my-item')
		item.setAttribute('id', 'it-1')
		item.setAttribute('title', 'my-title')

		item.setAttribute('active', '')

		item.innerHTML = /* HTML */ `
      <span>item-1</span>
    `
		item.connectedCallback()

		expect(item.hasAttribute('name')).toBeTruthy()
	})

	it('can be rendered with tag <a>', function () {
		const item = /** @type {Tabs} */ (document.createElement('ark-tabs-item'))
		item.setAttribute('href', '')

		item.innerHTML = /* HTML */ `
      <span>item-1</span>
    `
		item.connectedCallback()

		const element = item.querySelector('a')
		expect(element).toBeTruthy()
	})
})
