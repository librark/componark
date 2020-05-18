import { Checkbox } from '../../../src/components/checkbox'

describe('Checkbox', () => {
	it('can be instantiated', () => {
		const element = /** @type {Checkbox} */ (
			document.createElement('ark-checkbox'))
		expect(element).toBeTruthy()

		element.connectedCallback()

		var init = element.init()
		expect(element === init).toBeTruthy()
	})

	it('can be instantiated', () => {
		const element = new Checkbox()
		element.value = 'op1'
		element.connectedCallback()

		element.check()
		expect(element.hasAttribute('checked')).toBeTruthy()

		element.uncheck()
		expect(!element.hasAttribute('checked')).toBeTruthy()

		element.toggle()
		expect(element.hasAttribute('checked')).toBeTruthy()

		element.toggle()
		expect(!element.hasAttribute('checked')).toBeTruthy()
	})

	it('It does not allow changing the type of element.', () => {
		const element = new Checkbox()
		element.setAttribute('type', 'text')
		element.setAttribute('value', '')
		element.setAttribute('data-valid', '')
		element.setAttribute('autofocus', 'autofocus')
		element.connectedCallback()

		const event = new CustomEvent('click')

		// @ts-ignore
		element.onAlter(event)
		expect(element.hasAttribute('checked')).toBeTruthy()
		expect(element.hasAttribute('type')).toBeTruthy()
		expect(element.hasAttribute('value')).toBeTruthy()
		expect(!element.hasAttribute('autofocus')).toBeTruthy()

		element.uncheck()
		expect(!element.hasAttribute('checked')).toBeTruthy()
	})

	it('It does not allow changing the type of element.', () => {
		const element = new Checkbox()
		element.init({ value: 'op1' }).render()
		expect(element.value).toEqual('op1')
	})
})
