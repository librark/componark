import { Component } from '../../component'

export class TabsItem extends Component {
  init (context) {
    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
        <${this._getType()} ${this._getAttributes()}>
          ${this.innerHTML}
        </${this._getType()}>
    `
    this._removeAttribute()
  }

  _getAttributes () {
    const attributes = Array.from(this.attributes)

    return attributes.map((attribute) => {
      var attr = `${attribute.name}`
      if (attribute.value) attr += `=${attribute.value}`
      return attr !== 'active' ? attr : ''
    }).join(' ')
  }

  _getType () {
    return this.attributes.href === undefined ? 'button' : 'a'
  }

  _removeAttribute () {
    let i = 0
    while (this.attributes.length > i) {
      const name = this.attributes[i].name
      if (name === 'id' || name === 'active') {
        i++
        break
      }
      this.removeAttribute(name)
    }
  }
}
customElements.define('ark-tabs-item', TabsItem)
