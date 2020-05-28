/** @typedef {import('../../loader').CheckboxGroup} CheckboxGroup */
import { Component } from '../../loader'

export class CheckboxDemo extends Component {
	init (context) {
		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `
      <ark-checkbox-group listen on-alter="checkboxGroup" label="Checkboxs">
        <ark-checkbox value="op1">Opcion 1</ark-checkbox>
        <ark-checkbox value="op2" checked>Opcion 2</ark-checkbox>
        <ark-checkbox value="op3">Opcion 3</ark-checkbox>
      </ark-checkbox-group>

      <p>Valor seleccionado: <span data-checkbox-value></span></p>
    `
		return super.render()
	}

	load () {
		if (this.checkbox) {
			this.querySelector('[data-checkbox-value]').innerHTML = /** html */`
        ${this.checkbox.value}
      `
		}

		return super.load()
	}

	checkboxGroup (event) {
		this.querySelector(
			'[data-checkbox-value]'
		).innerHTML = event.detail.value || ''
	}

	/** @returns {CheckboxGroup} */
	get checkbox () {
		return this.querySelector('ark-checkbox-group')
	}
}
customElements.define('demo-checkbox', CheckboxDemo)
