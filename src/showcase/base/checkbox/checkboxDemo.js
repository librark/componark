import { Component } from '../components'

export class CheckboxDemo extends Component {
	init (context) {
		this.type = context['type'] || 'ark'
		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `
      <ark-checkbox-group listen on-alter="checkboxGroup" label="Checkboxs">
        <ark-checkbox value="op1">Opcion 1</ark-checkbox>
        <ark-checkbox value="op2">Opcion 2</ark-checkbox>
        <ark-checkbox value="op3">Opcion 3</ark-checkbox>
      </ark-checkbox-group>

      <p>Valor seleccionado: <span data-checkbox-value></span></p>
    `
		return super.render()
	}

	checkboxGroup (event) {
		this.querySelector('[data-checkbox-value]').innerHTML =
      event.detail.value || ''
	}
}
customElements.define('demo-checkbox', CheckboxDemo)
