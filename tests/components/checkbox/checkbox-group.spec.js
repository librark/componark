/** @typedef {import('../../../src/components').Checkbox} Checkbox */
import { CheckboxGroup } from '../../../src/components/checkbox'

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
		const element = /** @type {HTMLElement} */(document.createElement('div'))
		element.innerHTML = /* html */`
      <ark-checkbox-group listen on-alter="checkboxGroup" label="Checkboxs">
        <ark-checkbox value="op1">Opcion 1</ark-checkbox>
        <ark-checkbox value="op2" checked>Opcion 2</ark-checkbox>
        <ark-checkbox value="op3">Opcion 3</ark-checkbox>
      </ark-checkbox-group>
    `

		const checkboxGroup = /** @type {CheckboxGroup} */ (
			element.querySelector('ark-checkbox-group')
		)

		checkboxGroup.init().render().load()

		checkboxGroup.selectAll('ark-checkbox').forEach(checkbox => {
			checkbox.init().render().load()
		})

		const checkbox0 = /** @type {Checkbox} */ (
			checkboxGroup.selectAll('ark-checkbox')[0]
		)
		const checkbox1 = /** @type {Checkbox} */ (
			checkboxGroup.selectAll('ark-checkbox')[1]
		)
		const checkbox2 = /** @type {Checkbox} */ (
			checkboxGroup.selectAll('ark-checkbox')[2]
		)

		expect(checkboxGroup.value[0]).toEqual('op2')

		checkbox1.click()
		expect(!checkboxGroup.value.length).toBeTruthy()

		checkbox0.click()
		checkbox1.click()
		checkbox2.click()
		expect(checkboxGroup.value[0]).toEqual('op1')
		expect(checkboxGroup.value[1]).toEqual('op2')
		expect(checkboxGroup.value[2]).toEqual('op3')

		const label = /** @type {HTMLElement} */(
			checkboxGroup.querySelector('.ark-checkbox-group__label')
		)
		label.click()
	})
})
