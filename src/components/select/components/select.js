import { Component } from '../../component'

export class Select extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */`
        ${this._getLabel()}
        <select data-select ${this._getAttributes()} listen on-change="_change">
          ${this.innerHTML}
        </select>
    `
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

  _getAttributes () {
    const attributes = Array.from(this.attributes)

    return attributes.map((attribute) => {
      var attr = `${attribute.name}`
      if (attribute.value) attr += `=${attribute.value}`
      return attr
    }).join(' ')
  }

  _getLabel () {
    const label = this.getAttribute('label')
    return label ? /* html */ `
      <label>${label}</label>
    ` : ''
  }
}
customElements.define('ark-select', Select)
