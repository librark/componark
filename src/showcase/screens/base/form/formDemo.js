import { Component } from '../../loader'
/** @typedef {import('../../loader').Form} Form */

export class FormDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `${this.styles}
      <ark-form>
        <ark-input form-item="test" type="text" label="Test"></ark-input>

        <ark-input form-item="ip" type="text" label="IP"></ark-input>

        <ark-multiselect form-item="port" label="Port"></ark-multiselect>

        <ark-radio-group form-item="port" label="Port">
          <ark-radio-button value="1">1001</ark-radio-button>
          <ark-radio-button value="2">1002</ark-radio-button>
          <ark-radio-button value="3">1003</ark-radio-button>
        </ark-radio-group>

        <ark-checkbox-group form-item="security" label="Security">
          <ark-checkbox value="WEP">WEP</ark-checkbox>
          <ark-checkbox value="WPA">WPA</ark-checkbox>
          <ark-checkbox value="WPA2">WPA2</ark-checkbox>
        </ark-checkbox-group>
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
        security: 'WPA2,WEP',
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

  get styles () {
    return /* html */`
      <style>
        demo-form ark-form{
          display: flex;
          gap: .2rem;
          padding: .2rem;
        }
        demo-form ark-form > *{
          flex: 1 1 300px !important;
        }
      </style>
    `
  }
}
customElements.define('demo-form', FormDemo)
