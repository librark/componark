/** @typedef {import('../../../src/components').RadioButton} RadioButton */
import { RadioButton } from '../../../src/components/radio'

describe('RadioButton', () => {
	it('can be instantiated', () => {
		const element = /** @type {RadioButton} */ (
			document.createElement('ark-radio-button'))
		expect(element).toBeTruthy()

		var init = element.init({})
		expect(element === init).toBeTruthy()
	})

	it('can be instantiated', () => {
		const element = new RadioButton()
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
		const element = new RadioButton()
		element.setAttribute('type', 'text')
		element.setAttribute('value', '')
		element.setAttribute('data-valid', '')
		element.setAttribute('autofocus', 'autofocus')
		element.connectedCallback()

		const event = new CustomEvent('click')

		// @ts-ignore
		element._change(event)
		expect(element.hasAttribute('checked')).toBeTruthy()
		expect(element.hasAttribute('type')).toBeTruthy()
		expect(element.hasAttribute('value')).toBeTruthy()
		expect(!element.hasAttribute('autofocus')).toBeTruthy()

		element.uncheck()
		expect(!element.hasAttribute('checked')).toBeTruthy()
	})

	it('It does not allow changing the type of element.', () => {
		const element = new RadioButton()
		element.init({ value: 'op1' }).render()
		expect(element.value).toEqual('op1')
	})

	it('can render several times', () => {
		const container = document.createElement('div')
		container.appendChild(new RadioButton())

		const radio = /** @type {RadioButton} */(
			container.querySelector('ark-radio-button')
		)

		radio.init()
		radio.init()
		radio.init()
		radio.render()
		radio.render().load()

		expect(radio.querySelectorAll('input').length).toEqual(1)
	})
})
