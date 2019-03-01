export class Icon extends HTMLElement {
  connectedCallback () {
    this.name = this.getAttribute('name') || 'cloud'
    this.type = this.getAttribute('type') || 'fas'
    this.render()
  }

  render () {
    const template = this._renderFontawesome()
    if (this.type === 'md') {

    }

    this.innerHTML = template
  }

  _renderFontawesome () {
    return /* html */ `<i class="${this.type} ${this.name}"></i>`
  }
}
customElements.define('ark-icon', Icon)
