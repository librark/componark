import { Component } from '../../component'

export class RadioButton extends Component {
  constructor () {
    super()
    this.defaultContent = this.defaultContent || this.innerHTML
    this.value = ''
  }

  /**
   * @param {{
   *  name: string
   *  checked?: boolean
   * }} context?
   **/
  init (context) {
    this.name = context.name
    this.checked = context.checked
    return super.init()
  }

  reflectedProperties () {
    return ['name', 'value']
  }

  render () {
    this.innerHTML = /* html */ `
      <div class="ark-radio-button__button">
        <input data-input type="radio">
      </div>
      <div class="ark-radio-button__label">
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

  get input () {
    return /** @returns {HTMLInputElement} */(
      this.querySelector('[data-input]')
    )
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
    ]
  }
}
customElements.define('ark-radio-button', RadioButton)
