import './navbar.body.nav'

export class NavbarBody extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.addClass('justify-content-center')
    this.addClass('justify-content-end')
    this.addClass('justify-content-between')
    this.removeAttribute()
  }

  addClass (attribute) {
    if (this.hasAttribute(attribute)) {
      this.classList.add(`ark-navbar-body--${attribute}`)
    }
  }

  removeAttribute () {
    while (this.attributes.length > 0) {
      this.removeAttribute(this.attributes[0].name)
    }
  }
}
customElements.define('ark-navbar-body', NavbarBody)
