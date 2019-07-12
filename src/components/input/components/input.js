import { Component } from '../../component'

export class Input extends Component {
  init (context) {
    this.label = context['label']
    return super.init(context)
  }

  reflectedProperties () {
    return ['label']
  }

  render () {
    this.innerHTML = /* html */`
      <div class="${this._getTypeClass()}">
        <div class="ark-input__label" ${this._isRequired()}>
          <small>${this.label}</small>
        </div>

        <div>
          <div class="ark-input__input">
            <input data-input listen on-input="_change">
          </div>

          <div class="ark-input__alert">
            ${this.innerHTML}
          </div>
        </div>
      </div>
    `
    this._moverAtributos()
    return super.render()
  }

  get value () {
    const input = (/** @type {Input} */ (this.querySelector('[data-input]')))
    return input ? input.value : ''
  }

  // ---------------------------------------------------------------------------

  /** @param {Event} event */
  _change (event) {
    event.stopPropagation()
    this.dispatchEvent(new CustomEvent('alter', {
      detail: { value: this.value }
    }))
  }

  _isRequired () {
    return this.hasAttribute('required') ? 'required' : ''
  }

  _getTypeClass () {
    return this.hasAttribute('type')
      ? `ark-input__type-${this.getAttribute('type')}`
      : `ark-input__type-text`
  }

  _moverAtributos () {
    const element = this.querySelector('[data-input]')
    const attributes = Array.from(this.attributes)

    attributes.forEach(attribute => {
      if (this._defaultAttributes().find(item => item === attribute.name)) {
        element.setAttribute(attribute.name, attribute.value)
        this.removeAttribute(attribute.name)
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
      'type',
      'value',
      'width'
    ]
  }
}
customElements.define('ark-input', Input)
