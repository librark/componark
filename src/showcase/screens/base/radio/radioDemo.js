import { Component } from 'base/component'

export class RadioDemo extends Component {
  init (context) {
    return super.init()
  }

  render () {
    const background = "light"
    const color = "dark"
    this.innerHTML = /* html */ `
      <ark-radio-group listen on-alter="onSelectRadioGroup"
        label="Radio Buttons">
        <ark-radio-button background="${background}" color="${color}" value="op1">Option 1</ark-radio-button>
        <ark-radio-button background="${background}" color="${color}" value="op2">Option 2</ark-radio-button>
        <ark-radio-button background="${background}" color="${color}" value="op3">Option 3</ark-radio-button>
      </ark-radio-group>

      <p>Valor seleccionado: <span data-radio-button-value></span></p>
    `

    this.radioGroup['value'] = 'op2'

    this.updateSelectedValue()

    return super.render()
  }

  /** @param {MouseEvent} event */
  onSelectRadioGroup (event) {
    this.updateSelectedValue()
  }

  updateSelectedValue () {
    this.querySelector(
      '[data-radio-button-value]'
    ).innerHTML = this.radioGroup['value']
  }

  get radioGroup () {
    return this.select('ark-radio-group')
  }
}
Component.define('demo-radio', RadioDemo)
