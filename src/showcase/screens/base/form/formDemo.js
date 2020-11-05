import { Component } from '../../loader'
/** @typedef {import('../../loader').Form} Form */

export class FormDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `
      <ark-form>
        <ark-input form-item="test" type="text" label="Test"></ark-input>
        <ark-input form-item="ip" type="text" label="IP"></ark-input>

        <ark-radio-group form-item="port" label="Port">
          <ark-radio-button value="1">1001</ark-radio-button>
          <ark-radio-button value="2">1002</ark-radio-button>
          <ark-radio-button value="3">1003</ark-radio-button>
        </ark-radio-group>

      </ark-form>

      <ark-button listen on-click="getValues" background="primary">
        Ver Valores
      </ark-button>

      <p data-form-values></p>
    `

    this.formComponent.init({
      values: {
        test: '123',
        ip: '192.168.1.1',
        port: '2',
      }
    }).render()

    return super.render()
  }

  getValues () {
    const container = this.querySelector('[data-form-values]')
    container.textContent = JSON.stringify(this.formComponent.values)
  }

  get formComponent () {
    return /** @type {Form} */ (this.select('ark-form'))
  }
}
customElements.define('demo-form', FormDemo)
