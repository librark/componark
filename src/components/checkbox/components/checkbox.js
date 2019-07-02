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
      <div class="ark-checkbox__body" listen on-click="_onChange">
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

  _onChange () {
    this.toggel()

    this.dispatchEvent(new CustomEvent('checkbox:click', {
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
customElements.define('ark-checkbox', Checkbox)
