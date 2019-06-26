import { Component } from '../../component'
import { getSlots } from '../../../utils'

export class Input extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.slots = getSlots(this)

    this.innerHTML = /* html */`
      <div class="${this._getTypeClass()}">
        <div class="ark-input__label" ${this._isRequired()}>
          <small>${this._getSlots('label')}</small>
        </div>
        <div>
          <div class="ark-input__input">
            <input ${this._getAttributes()}>
          </div>
          <div class="ark-input__alert">
            ${this._getSlots('alert')}
          </div>
        </div>
      </div>
    `
    this._removeAttribute()
    return super.render()
  }

  _getSlots (key) {
    if (!this.slots || !this.slots[key]) { return '' }

    return /* html */`
        ${this.slots[key].map(element => `${element.outerHTML}`).join('')}
      `
  }

  _getAttributes () {
    return Array.from(this.attributes).map((attribute) => {
      return attribute.value
        ? `${attribute.name}=${attribute.value}`
        : attribute.name
    }).join(' ')
  }

  _removeAttribute () {
    while (this.attributes.length > 0) {
      this.removeAttribute(this.attributes[0].name)
    }
  }

  _isRequired () {
    return this.hasAttribute('required') ? 'required' : ''
  }

  _getTypeClass () {
    return this.hasAttribute('type')
      ? `ark-input__type-${this.getAttribute('type')}`
      : `ark-input__type-text`
  }
}
customElements.define('ark-input', Input)
