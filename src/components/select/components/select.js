import { Component } from '../../component'

export class Select extends Component {
  init (context) {
    this.label = context['label']
    return super.init()
  }

  reflectedProperties () {
    return ['label']
  }

  render () {
    this.innerHTML = /* html */`
        ${this._getLabel()}
        <select data-select listen on-change="_change">
          ${this.innerHTML}
        </select>
    `

    this._moverAtributos()
    return super.render()
  }

  get value () {
    const select = (/** @type {Select} */ (this.querySelector('[data-select]')))
    return select ? select.value : ''
  }

  // ---------------------------------------------------------------------------

  /** @param {Event} event */
  _change (event) {
    event.stopPropagation()
    this.dispatchEvent(new CustomEvent('alter', {
      detail: { value: this.value }
    }))
  }

  _getLabel () {
    return this.label ? /* html */ `
      <label>${this.label}</label>
    ` : ''
  }

  _moverAtributos () {
    const element = this.querySelector('[data-select]')
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
      'autofocus',
      'disabled',
      'form',
      'multiple',
      'name',
      'required',
      'size'
    ]
  }
}
customElements.define('ark-select', Select)
