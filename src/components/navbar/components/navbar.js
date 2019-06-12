export class Navbar extends HTMLElement {
  init (context) {
    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
      <div class="ark-navbar__content">
        ${this.innerHTML}
      </div>
    `
    this._listen()
  }

  _listen () {
    const toggleButton = this.querySelector('[ark-navbar-toggle]')
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.toggleContent())
    }
  }

  toggleContent () {
    const myClass = 'ark-navbar--show'
    this.classList.toggle(myClass)
  }
}
customElements.define('ark-navbar', Navbar)
