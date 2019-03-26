export class SidebarSubtitle extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
      <p>${this.innerHTML}</p>
    `
  }
}
customElements.define('ark-sidebar-subtitle', SidebarSubtitle)
