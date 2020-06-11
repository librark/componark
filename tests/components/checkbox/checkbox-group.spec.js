import { Checkbox, CheckboxGroup } from '../../../src/components/checkbox'

describe('Checkbox', () => {
	it('can be instantiated', () => {
		const checkboxGroup = new CheckboxGroup()
		checkboxGroup.setAttribute('label', 'myCheckboxGroup')
		checkboxGroup.init().render().load()

		expect(
			checkboxGroup.querySelector('[data-checkbox-group-label]').textContent
		).toEqual('myCheckboxGroup')
	})

	it('can be instantiated', () => {
		const element = document.createElement('div')
		element.innerHTML = /* html */ `
      <ark-checkbox-group>
        <ark-checkbox value="1" checked></ark-checkbox>
        <ark-checkbox value="2"></ark-checkbox>
        <ark-checkbox value="3"></ark-checkbox>
      </ark-checkbox-group>
    `

		const checkboxGroup = /** @type {CheckboxGroup} */(
			element.querySelector('ark-checkbox-group')
		)

		checkboxGroup.init().render().load()

		element.querySelectorAll('ark-checkbox').forEach(
			(/** @type {Checkbox} */ item) => {
				item.init().render().load()
			})

		expect(checkboxGroup.value[0]).toEqual('1')
	})

	it('returns selected values Group', () => {
		const checkboxGroup = new CheckboxGroup()

		const checkbox1 = new Checkbox()
		checkbox1.init({ value: 'op1', checked: true }).render().load()

		const checkbox2 = new Checkbox()
		checkbox2.init({ value: 'op2' }).render().load()

		checkboxGroup.appendChild(checkbox1)
		checkboxGroup.appendChild(checkbox2)

		checkboxGroup.init().render().load()

		const event = new CustomEvent('alter')
		// @ts-ignore
		checkboxGroup.onAlter(event)

		expect(checkboxGroup).toBeTruthy()

		expect(!checkboxGroup.value.length).toBeTruthy()
	})
})
