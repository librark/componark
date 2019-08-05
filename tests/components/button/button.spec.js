/** @typedef {import('../../../src/components').Button} Button */
import '../../../src/components/button'

describe('Button', () => {
	it('can be instantiated', () => {
		const button = /** @type {Button} */ (document.createElement('ark-button'))
		expect(button).toBeTruthy()

		var init = button.init({})
		expect(button === init).toBeTruthy()
	})

	it('can be rendered without content', function () {
		const button = /** @type {Button} */ (document.createElement('ark-button'))
		button.connectedCallback()
		const buttonElement = button.querySelector('button')
		expect(buttonElement).toBeTruthy()
	})

	it('can be rendered with text content', function () {
		const button = /** @type {Button} */ (document.createElement('ark-button'))
		button.textContent = 'Submit'
		button.connectedCallback()
		const content = button.querySelector('button').textContent.trim()
		expect(content).toEqual('Submit')
	})

	it('can be rendered with attribute value', function () {
		const button = /** @type {Button} */ (document.createElement('ark-button'))
		button.setAttribute('myAttr', 'ok')
		button.connectedCallback()

		expect(button.hasAttribute('myAttr')).toBeTruthy()
		expect(button.getAttribute('myAttr')).toEqual('ok')
	})

	it('can be rendered with tag <a>', function () {
		const button = /** @type {Button} */ (document.createElement('ark-button'))
		const attr = document.createAttribute('href')
		attr.value = '#'
		button.setAttributeNode(attr)

		button.connectedCallback()
		const aElement = button.querySelector('a')
		expect(aElement).toBeTruthy()
	})

	it('can be rendered Fab button', function () {
		const button = /** @type {Button} */ (document.createElement('ark-button'))
		button.setAttribute('fab', '')

		button.connectedCallback()

		expect(button.getAttribute('horizontal')).toEqual('end')
		expect(button.getAttribute('vertical')).toEqual('end')
	})

	it('can be rendered Fab button horizontal, vertical center', function () {
		const button = /** @type {Button} */ (document.createElement('ark-button'))
		button.setAttribute('fab', '')
		button.setAttribute('horizontal', 'center')
		button.setAttribute('vertical', 'center')
		button.setAttribute('autofocus', '')

		button.connectedCallback()

		expect(button.getAttribute('horizontal')).toEqual('center')
		expect(button.getAttribute('vertical')).toEqual('center')
	})
})
