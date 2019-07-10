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
          <input data-radio-button type="radio" ${this._getAttributes()}>
        </div>
        <div class="ark-radio-button__label">
          <small>${this.innerHTML}</small>
        </div>
      </div>
    `
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

  _getAttributes () {
    return Array.from(this.attributes).map((attribute) => {
      if (!attribute.name.startsWith('on-') && attribute.name !== 'type') {
        return attribute.value
          ? `${attribute.name}=${attribute.value}`
          : attribute.name
      }
    }).join(' ')
  }
}
customElements.define('ark-radio-button', RadioButton)
