export class Navbar extends HTMLElement {
  connectedCallback () { }

  toggleContent () {
    const myClass = 'ark-navbar--show'
    this.classList.toggle(myClass)
  }
}
customElements.define('ark-navbar', Navbar)
