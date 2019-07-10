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
          <input data-checkbox type="checkbox" ${this._getAttributes()}>
        </div>
        <div class="ark-checkbox__label">
          <small>${this.innerHTML}</small>
        </div>
      </div>
    `
    return super.render()
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
customElements.define('ark-checkbox', Checkbox)
