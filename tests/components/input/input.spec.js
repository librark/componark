/** @typedef {import('../../../src/components').Input} Input */
import { Input } from '../../../src/components/input'

describe('Input', () => {
	it('can be instantiated', () => {
		const item = /** @type {Input} */(document.createElement('ark-input'))
		expect(item).toBeTruthy()

		var init = item.init({})
		expect(item === init).toBeTruthy()
	})
	it('can be rendered without content', () => {
		const item = /** @type {Input} */(document.createElement('ark-input'))
		item.innerHTML = /* html */``
		item.connectedCallback()
	})
	it('can be rendered without content', () => {
		const item = /** @type {Input} */(document.createElement('ark-input'))
		item.defaultContent = /* html */`
      <label slot="alert">alert label 1</label>
      <label slot="alert">alert label 2</label>
    `
		item.connectedCallback()

		const alerts = item.querySelector('.ark-input__alert')
		expect(alerts.childElementCount === 2).toBeTruthy()
	})

	it('can be rendered with type', function () {
		const item = /** @type {Input} */(document.createElement('ark-input'))
		const att = document.createAttribute('type')
		att.value = 'date'
		item.setAttributeNode(att)

		item.connectedCallback()

		expect(item.querySelector('.ark-input__type-date') !== null).toBeTruthy()
	})

	it('can be rendered with required', function () {
		const item = /** @type {Input} */(document.createElement('ark-input'))
		const att = document.createAttribute('required')
		item.setAttributeNode(att)

		item.connectedCallback()

		expect(item.querySelector('.ark-input__type-text') !== null).toBeTruthy()
	})

	it('can return value', function () {
		const input = new Input()
		input.connectedCallback()
		input.value = 'abc'
		expect(input.value === 'abc').toBeTruthy()

		const event = new CustomEvent('input')
		// @ts-ignore
		input._change(event)

		input.innerHTML = ''
		expect(input.value === '').toBeTruthy()
	})

	it('can move attributes', function () {
		const input = new Input()
		input.setAttribute('value', 'abc')
		input.setAttribute('listen', 'listen')
		input.connectedCallback()

		expect(input.hasAttribute('listen')).toBeTruthy()
	})
})
