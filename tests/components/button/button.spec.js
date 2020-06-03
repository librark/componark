import { Button } from '../../../src/components/button'

describe('Button', () => {
	it('can be instantiated', () => {
		const button = new Button()
		expect(button).toBeTruthy()

		const init = button.init()
		expect(button === init).toBeTruthy()
	})

	it('can be rendered without content', function () {
		const button = new Button()
		button.connectedCallback()
		const buttonElement = button.querySelector('button')
		expect(buttonElement).toBeTruthy()
	})

	it('can be rendered with attribute value', function () {
		const button = new Button()
		button.setAttribute('myAttr', 'ok')
		button.connectedCallback()

		expect(button.hasAttribute('myAttr')).toBeTruthy()
		expect(button.getAttribute('myAttr')).toEqual('ok')
	})

	it('can be rendered with tag <a>', function () {
		const button = new Button()
		const attr = document.createAttribute('href')
		attr.value = '#'
		button.setAttributeNode(attr)

		button.connectedCallback()
		const aElement = button.querySelector('a')
		expect(aElement).toBeTruthy()
	})

	it('can be rendered Fab button', function () {
		const button = new Button()
		button.setAttribute('fab', '')

		button.connectedCallback()

		expect(button.getAttribute('horizontal')).toEqual('end')
		expect(button.getAttribute('vertical')).toEqual('end')
	})

	it('can be rendered Fab button horizontal, vertical center', function () {
		const button = new Button()
		button.setAttribute('fab', '')
		button.setAttribute('horizontal', 'center')
		button.setAttribute('vertical', 'center')
		button.setAttribute('autofocus', '')

		button.connectedCallback()

		expect(button.getAttribute('horizontal')).toEqual('center')
		expect(button.getAttribute('vertical')).toEqual('center')
	})
})
