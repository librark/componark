export class Button extends HTMLElement {
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
    this.isFab()
    const attributes = Array.from(this.attributes)

    return attributes.map((attribute) => {
      var attr = `${attribute.name}`
      if (attribute.value) attr += `=${attribute.value}`
      return attr
    }).join(' ')
  }

  isFab () {
    if (
      this.hasAttribute('fab') &&
      !this.hasAttribute('horizontal') &&
      !this.hasAttribute('vertical')
    ) {
      this.setAttribute('horizontal', 'end')
      this.setAttribute('vertical', 'end')
    }
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
