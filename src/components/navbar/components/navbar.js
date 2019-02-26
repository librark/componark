import './navbar.body'
import './navbar.header'

export class Navbar extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    const children = Array.from(this.children)
    this.innerHTML = /* html */`
        ${children.map((element) => element.outerHTML).join('')}
    `
  }
}
customElements.define('ark-navbar', Navbar)
