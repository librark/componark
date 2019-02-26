export class SidebarScrim extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  get solid () {
    return this.hasAttribute('solid')
  }

  render () {
    this.innerHTML = /* html */``

    if (this.solid) {
      this.classList.add('ark-sidebar-scrim--solid')
    }
  }
}
customElements.define('ark-sidebar-scrim', SidebarScrim)
