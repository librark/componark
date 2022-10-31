import { Component } from '../../../base/component/index.js'
import styles from '../styles/index.js'

const tag = 'ark-input'
export class Input extends Component {
  init(context = {}) {
    this.background = context.background || this.background || ''
    this.color = context.color || this.color || ''
    this.borderColor = context.borderColor  || this.borderColor || ''
    this.placeholder = context.placeholder || this.placeholder || ''
    this.round = context.round || this.round || 'xs'
    return super.init()
  }

  reflectedProperties () {
    return ['background', 'color', 'label', 'placeholder', 'borderColor','round']
  }

  render () {
    this.content = /* html */`
    <label class="ark-input__label" ${this.isRequired()}>
      <span class="ark-input__text">${this['label']}</span>
      <input background="${this.background}" 
             color="${this.color}" 
             border-color="${this.borderColor}"
             placeholder = "${this.placeholder}"
             round ="${this.round}"
             class="ark-input__input"
             data-input listen on-input="onInputChange">
    </label>
  `

    this.moveAttributes()
    return super.render()
  }

  /** @param {Event} event */
  onInputChange (event) {
    event.stopPropagation()
    this.value = this.input.value
  }

  dispatchAlterEvent () {
    this.emit('alter', this.value)
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
    return /** @type {string} */(this.getAttribute('value')) || ''
  }

  set value (value) {
    this.setAttribute('value', value || '')
    this.input.value = value || ''
    this.dispatchAlterEvent()
  }
}
Component.define(tag, Input, styles)
