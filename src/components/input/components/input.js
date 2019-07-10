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
            <input data-input ${this._getAttributes()}
              listen on-input="_change">
          </div>

          <div class="ark-input__alert">
            ${this.innerHTML}
          </div>
        </div>
      </div>
    `

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

  _getAttributes () {
    return Array.from(this.attributes).map((attribute) => {
      if (!attribute.name.startsWith('on-')) {
        return attribute.value
          ? `${attribute.name}=${attribute.value}`
          : attribute.name
      }
    }).join(' ')
  }

  _isRequired () {
    return this.hasAttribute('required') ? 'required' : ''
  }

  _getTypeClass () {
    return this.hasAttribute('type')
      ? `ark-input__type-${this.getAttribute('type')}`
      : `ark-input__type-text`
  }
}
customElements.define('ark-input', Input)
