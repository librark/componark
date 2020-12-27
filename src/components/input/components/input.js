import { Component } from '../../component'

export class Input extends Component {
  reflectedProperties () {
    return ['label']
  }

  render () {
    this.innerHTML = /* html */`
    <label class="ark-input__label" ${this.isRequired()}>
      ${this.label} <input class="ark-input__input"
      data-input listen on-input="onInputChange">
    </label>
    `

    this.moveAttributes()
    return super.render()
  }

  /** @param {Event} event */
  onInputChange (event) {
    event.stopImmediatePropagation()
    this.value = this.input.value
  }

  dispatchAlterEvent () {
    this.dispatchEvent(
      new CustomEvent('alter', {
        detail: {
          value: this.value,
        }
      })
    )
  }

  isRequired () {
    return this.hasAttribute('required') ? 'required' : ''
  }

  moveAttributes () {
    Array.from(this.attributes).forEach(attribute => {
      this.input.setAttribute(attribute.name, attribute.value)
    })
  }

  get input () {
    return /** @type {HTMLInputElement} */(this.querySelector('[data-input]'))
  }

  get value () {
    return /** @type {string} */(this.getAttribute('value'))
  }

  set value (value) {
    this.setAttribute('value', value)
    this.input.value = value
    this.dispatchAlterEvent()
  }
}
customElements.define('ark-input', Input)
