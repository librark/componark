import { Component } from '../../component'

export class Input extends Component {
  /**
   * @param {{
   *  label?: string
   *  value?: string
   * }} context
   */
  init (context = {}) {
    this.label = context.label || this.label
    this.value = context.value || this.value || ''

    // local variables
    this.defaultContent = this.defaultContent || this.innerHTML
    return super.init()
  }

  reflectedProperties () {
    return ['label']
  }

  render () {
    this.innerHTML = /* html */ `
      <div class="ark-input__label" ${this._isRequired()}>
        <label>${this.label}</label>
      </div>

      <div class="ark-input__input">
        <input data-input listen on-input="_onChangeInput">
      </div>

      <div class="ark-input__alert">
        ${this.defaultContent}
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
    return this.hasAttribute('required') ? 'required' : ''
  }

  _moveAttributes () {
    Array.from(this.attributes).forEach(attribute => {
      if (this._defaultAttributes().find(item => item === attribute.name)) {
        this.input.setAttribute(attribute.name, attribute.value)
      }
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
    if (this.input) this.input.value = value
    this._dispatchAlterEvent()
  }

  /** @return {Array<string>} */
  _defaultAttributes () {
    return [
      'accept',
      'align',
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
      'type',
      'value',
    ]
  }
}
customElements.define('ark-input', Input)
