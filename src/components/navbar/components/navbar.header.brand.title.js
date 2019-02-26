export class NavbarHeaderBrandTitle extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    const title = this.innerText

    this.innerHTML = /* html */`
      <h3>${title}</h3>
    `
  }
}
customElements.define('ark-navbar-header-brand-title', NavbarHeaderBrandTitle)
