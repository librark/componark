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
      <div class="ark-radio-button__body" listen on-click="_onChange">
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
    if (this.querySelector('[data-radio-button]').hasAttribute('checked')) {
      this.unchecked()
    } else {
      this.checked()
    }
  }

  // ---------------------------------------------------------------------------

  _onChange () {
    this.toggel()

    this.dispatchEvent(new CustomEvent('radiobutton:click', {
      detail: { value: this.value }
    }))
  }

  _getAttributes () {
    const attributes = Array.from(this.attributes)

    return attributes.map((attribute) => {
      if (attribute.name !== 'type') {
        return attribute.value
          ? `${attribute.name}=${attribute.value}`
          : attribute.name
      }
    }).join(' ')
  }
}
customElements.define('ark-radio-button', RadioButton)
