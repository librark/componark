import { Component } from '../../component'

export class Input extends Component {
  reflectedProperties () {
    return ['label']
  }

  render () {
    this.innerHTML = /* html */ `
      <label class="ark-input__label" ${this._isRequired()}>
        ${this.label}</label>

      <div class="ark-input__input">
        <input data-input listen on-input="_onChangeInput">
      </div>
    `
    this._moveAttributes()
    return super.render()
  }

  /** @param {Event} event */
  _onChangeInput (event) {
    event.stopImmediatePropagation()
    this.value = this.input.value
  }

  _dispatchAlterEvent () {
    this.dispatchEvent(
      new CustomEvent('alter', {
        detail: {
          value: this.value,
        }
      })
    )
  }

  _isRequired () {
    return this.hasAttribute('required') ? 'required' : 'x'
  }

  _moveAttributes () {
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
    this._dispatchAlterEvent()
  }
}
customElements.define('ark-input', Input)
