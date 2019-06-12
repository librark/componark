export class Icon extends HTMLElement {
  init (context) {
    return this
  }

  connectedCallback () {
    this.type = this.getAttribute('type') || 'aws'
    this.name = this.getAttribute('name') || 'fas cloud'
    this.render()
  }

  render () {
    if (this.type === 'aws') {
      this.innerHTML = this._renderFontawesome()
    }
  }

  _renderFontawesome () {
    return /* html */ `<i class="${this.name}"></i>`
  }
}
customElements.define('ark-icon', Icon)
