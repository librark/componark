import { Component } from '../../component'

export class Checkbox extends Component {
  init (context) {
    this.value = context['value']

    return super.init(context)
  }

  reflectedProperties () {
    return ['value']
  }

  render () {
    this.innerHTML = /* html */`
      <div class="ark-checkbox__body" listen on-click="_change">
        <div class="ark-checkbox__input">
          <input data-checkbox type="checkbox">
        </div>
        <div class="ark-checkbox__label">
          <small>${this.innerHTML}</small>
        </div>
      </div>
    `

    this._moverAtributos()
    return super.render()
  }

  get value () {
    const element = (/** @type {Checkbox} */ (
      this.querySelector('[data-checkbox]')))
    return element ? element.value : ''
  }

  set value (data) {
    const element = (/** @type {Checkbox} */ (
      this.querySelector('[data-checkbox]')))

    element.value = data
  }

  checked () {
    const checkbox = this.querySelector('[data-checkbox]')
    checkbox.setAttribute('checked', 'checked')
    checkbox['checked'] = true
  }

  unchecked () {
    const checkbox = this.querySelector('[data-checkbox]')
    checkbox.removeAttribute('checked')
    checkbox['checked'] = false
  }

  toggel () {
    if (this.querySelector('[data-checkbox]').hasAttribute('checked')) {
      this.unchecked()
    } else {
      this.checked()
    }
  }

  isChecked () {
    const checkbox = this.querySelector('[data-checkbox]')
    return checkbox.hasAttribute('checked')
  }

  // ---------------------------------------------------------------------------
  /** @param {Event} event */
  _change (event) {
    event.stopPropagation()

    this.toggel()
    this.dispatchEvent(new CustomEvent('alter', {
      detail: {
        value: this.value,
        checked: this.isChecked()
      }
    }))
  }

  _moverAtributos () {
    const element = this.querySelector('[data-checkbox]')
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
      'value',
      'width'
    ]
  }
}
customElements.define('ark-checkbox', Checkbox)
