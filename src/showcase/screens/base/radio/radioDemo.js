import { Component } from '../../loader'

export class RadioDemo extends Component {
  init (context) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `
      <ark-radio-group listen on-alter="radioGroup" label="Radio Buttons">
        <ark-radio-button value="op1">Opcion 1</ark-radio-button>
        <ark-radio-button value="op2">Opcion 2</ark-radio-button>
        <ark-radio-button value="op3">Opcion 3</ark-radio-button>
      </ark-radio-group>

      <p>Valor seleccionado: <span data-radio-button-value></span></p>
    `
    return super.render()
  }

  radioGroup (event) {
    this.querySelector('[data-radio-button-value]').innerHTML =
      event.detail.value || ''
  }
}
customElements.define('demo-radio', RadioDemo)
