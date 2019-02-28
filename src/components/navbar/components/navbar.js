export class Navbar extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.addFixedTop()
    this.addJustify()
  }

  addFixedTop () {
    if (this.hasAttribute('fixed-top')) {
      this.classList.add('ark-navbar--fixed-top')
    }
  }

  addJustify () {
    const justify = this.getAttribute('justify')
    if (justify) {
      this.classList.add(`ark-navbar--${justify}`)
    }
  }

  toggleContent () {
    const myClass = 'ark-navbar--show'
    this.classList.toggle(myClass)
  }
}
customElements.define('ark-navbar', Navbar)
