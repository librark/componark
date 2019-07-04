import { Component } from '../../component'

export class Select extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */`
        ${this._getPlaceholder()}
        <select ${this._getAttributes()}>
          ${this.innerHTML}
        </select>
    `

    this._removeAttribute()
    return super.render()
  }

  _getAttributes () {
    const attributes = Array.from(this.attributes)

    return attributes.map((attribute) => {
      var attr = `${attribute.name}`
      if (attribute.value) attr += `=${attribute.value}`
      return attr
    }).join(' ')
  }

  _removeAttribute () {
    while (this.attributes.length > 0) {
      this.removeAttribute(this.attributes[0].name)
    }
  }

  _getPlaceholder () {
    const placeholder = this.getAttribute('placeholder')
    return placeholder ? /* html */ `
      <label>${placeholder}</label>
    ` : ''
  }
}
customElements.define('ark-select', Select)
