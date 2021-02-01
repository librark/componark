import { Component } from '../../../base/component'
import { styles } from '../styles'

const tag = 'ark-checkbox'
export class Checkbox extends Component {
  constructor () {
    super()
    this.defaultContent = this.defaultContent || this.content
    /** @type {string} */
    this.value = this.value
  }

  init (context = {}) {
    this.name = context.name
    this.checked = context.checked
    return super.init()
  }

  reflectedProperties () {
    return ['name', 'value']
  }

  render () {
    this.content = /* html */ `
      <div class="ark-checkbox__input">
        <input data-input type="checkbox">
      </div>
      <div class="ark-checkbox__label">
        <small>${this.defaultContent}</small>
      </div>
    `

    this._moveAttributes()
    return super.render()
  }


  /** @returns {Boolean} */
  get checked () {
    return this.hasAttribute('checked')
  }

  /** @param {Boolean} value */
  set checked (value) {
    if (value) {
      this.setAttribute('checked', '')
      if (this.input) this.input['checked'] = true
    } else {
      this.removeAttribute('checked')
      if (this.input) this.input['checked'] = false
    }
  }

  /** @returns {HTMLInputElement} */
  get input () {
    return this.querySelector('[data-input]')
  }

  _moveAttributes () {
    Array.from(this.attributes).forEach(attribute => {
      if (this._defaultAttributes().find(item => item === attribute.name)) {
        this.input.setAttribute(attribute.name, attribute.value)
      }
    })
  }

  /** @return {Array<string>} */
  _defaultAttributes () {
    return [
      'accept',
      'alt',
      'autocomplete',
      'autofocus',
      'checked',
      'dirname',
      'disabled',
      'form',
      'formaction',
      'formenctype',
      'formmethod',
      'formnovalidate',
      'formtarget',
      'height',
      'list',
      'min',
      'multiple',
      'name',
      'pattern',
      'placeholder',
      'readonly',
      'required',
      'size',
      'src',
      'step',
      'value',
      'width',
    ]
  }
}
Component.define(tag, Checkbox, styles)
