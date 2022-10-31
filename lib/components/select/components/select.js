import { Component } from '../../../base/component/index.js'
import styles from '../styles/index.js'

const tag = 'ark-select'
export class Select extends Component {
  constructor () {
    super()
    this.defaultContent = this.defaultContent || this.content
  }

  init (context = {}) {
    this.label = context.label || this.label
    this.value = context.value || this.value || ''
    return super.init()
  }

  reflectedProperties () {
    return ['label']
  }

  render () {
    this.innerHTML = /* html */ `
      ${this._getLabel()}
      <select data-select listen on-change="_change">
        ${this.defaultContent}
      </select>
    `

    this._moveAttributes()
    return super.render()
  }

  get selectElement () {
    return /** @type {HTMLSelectElement} */ (
      this.querySelector('select[data-select]')
    ) || {}
  }

  get value () {
    return this.selectElement['value'] || ''
  }
  set value (value) {
    this.selectElement['value'] = value
  }

  /** @param {Event} event */
  _change (event) {
    event.stopPropagation()
    this.dispatchEvent(
      new CustomEvent('alter', {
        detail: {
          value: this.value,
          origin: event
        }
      })
    )
  }

  _getLabel () {
    return this.label ? /* html */ `
      <label class="ark-select--label">${this.label}</label>
    ` : ''
  }

  _moveAttributes () {
    const element = this.querySelector('[data-select]')
    const attributes = Array.from(this.attributes)

    attributes.forEach(attribute => {
      if (this._defaultAttributes().find(item => item === attribute.name)) {
        element.setAttribute(attribute.name, attribute.value)
        // this.removeAttribute(attribute.name)
      }
    })
  }

  /** @return {Array<string>} */
  _defaultAttributes () {
    return [
      'autofocus',
      'form',
      'multiple',
      'name',
      'required',
      'size'
    ]
  }
}
Component.define(tag, Select, styles)
