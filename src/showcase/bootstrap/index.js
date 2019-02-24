
export class BootstrapShowcaseComponent extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
        <p>Bootstrap Showcase</p>
        `
  }
}
customElements.define('app-showcase-bootstrap', BootstrapShowcaseComponent)
