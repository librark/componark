import { Component } from 'base/component'

export class SelectDemo extends Component {
  init (context) {
    return super.init()
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
      <div>
        <p>This is a select.</p>
      </div>

      <ark-select background="light" color="dark" listen on-alter="selectEventListener" label="my select">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </ark-select>

      <ark-select label="Disabled" disabled>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </ark-select>

      <p>Elemento seleccionado: <span data-select-value></span></p>
    `
    return super.render()
  }

  selectEventListener (event) {
    const element = this.querySelector('[data-select-value]')
    if (element) element.textContent = event.detail.value
  }
}
Component.define('demo-select', SelectDemo)
