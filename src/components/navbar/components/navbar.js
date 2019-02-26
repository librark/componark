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
    if (this.fixedTop) this.addFixedTop()
  }

  get fixedTop () {
    return this.hasAttribute('fixed-top')
  }

  addFixedTop () {
    this.classList.add('ark-navbar--fixed-top')
  }
}
customElements.define('ark-navbar', Navbar)
