export class Button extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
        <${this._getType()} ${this._getAttributes()}>
          ${this.innerHTML}
        </${this._getType()}>
    `
  }

  _getAttributes () {
    const attributes = Array.from(this.attributes)

    return attributes.map((attribute) =>
      `${attribute.name}=${attribute.value}`
    ).join(' ')
  }

  _getType () {
    const tag = this.attributes.href === undefined ? 'button' : 'a'
    return tag
  }

  _removeAttribute () {
    while (this.attributes.length > 0) {
      this.removeAttribute(this.attributes[0].name)
    }
  }
}
customElements.define('ark-button', Button)
