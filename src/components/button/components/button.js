export class Button extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  init (context) {
    return this
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
      return attr
    }).join(' ')
  }

  _getType () {
    return this.attributes.href === undefined ? 'button' : 'a'
  }

  _removeAttribute () {
    while (this.attributes.length > 0) {
      this.removeAttribute(this.attributes[0].name)
    }
  }
}
customElements.define('ark-button', Button)
