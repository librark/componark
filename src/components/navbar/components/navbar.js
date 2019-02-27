export class Navbar extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.addFixedTop()
    this.addJustify()
    this.addBtn()
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

  addBtn () {
    let header = Array.from(this.children)[0] || null
    if (header) {
      var div = document.createElement('div')
      div.innerHTML = 'ok'
      header.prepend(div)
    }
  }
}
customElements.define('ark-navbar', Navbar)
