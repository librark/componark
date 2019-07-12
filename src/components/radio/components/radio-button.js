import { Component } from '../../component'

export class RadioButton extends Component {
  init (context) {
    this.value = context['value']
    return super.init(context)
  }

  reflectedProperties () {
    return ['value']
  }

  render () {
    this.innerHTML = /* html */`
      <div class="ark-radio-button__body" listen on-click="_change">
        <div class="ark-radio-button__button">
          <input data-radio-button type="radio">
        </div>
        <div class="ark-radio-button__label">
          <small>${this.innerHTML}</small>
        </div>
      </div>
    `

    this._moverAtributos()
    return super.render()
  }

  checked () {
    const button = this.querySelector('[data-radio-button]')
    button.setAttribute('checked', 'checked')
    button['checked'] = true
  }

  unchecked () {
    const button = this.querySelector('[data-radio-button]')
    button.removeAttribute('checked')
    button['checked'] = false
  }

  toggel () {
    if (this.isChecked()) {
      this.unchecked()
    } else {
      this.checked()
    }
  }

  isChecked () {
    return this.querySelector('[data-radio-button]').hasAttribute('checked')
  }

  // ---------------------------------------------------------------------------
  /** @param {Event} event */
  _change (event) {
    event.stopPropagation()
    this.toggel()

    this.dispatchEvent(new CustomEvent('alter', {
      detail: {
        value: this.value
      }
    }))
  }

  _moverAtributos () {
    const element = this.querySelector('[data-radio-button]')
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
      'width'
    ]
  }
}
customElements.define('ark-radio-button', RadioButton)
