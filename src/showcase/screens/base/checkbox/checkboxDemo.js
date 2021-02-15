import { Component } from 'base/component'

const tag = 'demo-checkbox'
export class CheckboxDemo extends Component {
  init (context) {
    return super.init()
  }

  render () {
    const background = "light"
    const color = "dark"

    this.innerHTML = /* html */ `
      <ark-checkbox-group listen on-alter="onSelectedCheckboxGroup"
        label="Checkboxs">

        <ark-checkbox background="${background}" color="${color}" value="op1">Opcion 1</ark-checkbox>
        <ark-checkbox background="${background}" color="${color}" value="op2" checked>Opcion 2</ark-checkbox>
        <ark-checkbox background="${background}" color="${color}" value="op3">Opcion 3</ark-checkbox>

      </ark-checkbox-group>

      <p>Valor seleccionado: <span data-checkbox-value></span></p>

      <a class="reference" target="_blank" href="https://github.com/knowark/componark/tree/master/src/components/checkbox/README.rst">
      * Reference
      </a>
    `

    this.checkboxGroup['value'] = 'op1,op2'

    return super.render()
  }

  load () {
    if (this.checkboxGroup) {
      this.querySelector('[data-checkbox-value]').innerHTML = /** html */`
        ${this.checkboxGroup['value']}
      `
    }

    return super.load()
  }

  onSelectedCheckboxGroup (event) {
    this.querySelector(
      '[data-checkbox-value]'
    ).innerHTML = event.detail.value || ''
  }


  get checkboxGroup () {
    return this.querySelector('ark-checkbox-group')
    
  }
}
Component.define(tag, CheckboxDemo)
