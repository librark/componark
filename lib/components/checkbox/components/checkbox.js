import { Component } from '../../../base/component/index.js'
import styles from '../styles/index.js'

const tag = 'ark-checkbox'
export class Checkbox extends Component {
  constructor () {
    super()
    this.defaultContent = this.defaultContent || this.content
    /** @type {string} */
  }
  
  init (context = {}) {
    this.name = context.name
    this.checked = context.checked
    this.value = context.value
    this.background = context.background || this.background || 'white'
    this.color = context.color || this.color || 'dark'
    return super.init()
  }

  reflectedProperties () {
    return ['name', 'value', 'background', 'color']
  }

  render () {
    this.content = /* html */ `
      <div class="ark-checkbox__input" 
        background="${this.background}" 
        color="${this.color}"
      >
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
      this.input['checked'] = true
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

  //Methods

  check(){
    this.checked = true
  }
  unCheck(){
    this.checked = false
  }
  toggle(){
    if (this.checked == true){
      this.checked = false
    } else {
      this.checked = true
    }
  }

}
Component.define(tag, Checkbox, styles)
