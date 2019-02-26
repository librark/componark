export class NavbarHeaderBrandImage extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  get src () {
    return this.getAttribute('src')
  }

  get width () {
    return this.getAttribute('width')
  }

  get height () {
    return this.getAttribute('height')
  }

  render () {
    const attributes = Array.from(this.attributes)
    this.innerHTML = /* html */`
    <img ${attributes.map((attribute) => `
    ${attribute.name}=${attribute.value}`).join(' ')}>
    `
    while (this.attributes.length > 0) {
      this.removeAttribute(this.attributes[0].name)
    }
  }
}
customElements.define('ark-navbar-header-brand-image', NavbarHeaderBrandImage)
