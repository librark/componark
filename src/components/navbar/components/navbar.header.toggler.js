import image from './assets/boton-menu.png'

export class NavbarHeaderToggler extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
      <img src="${image}" alt=""/>
    `
  }
}
customElements.define('ark-navbar-header-toggler', NavbarHeaderToggler)
