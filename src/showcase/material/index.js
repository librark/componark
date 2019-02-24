
export class MaterialShowcaseComponent extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
        <p>Material Showcase</p>
        `
  }
}
customElements.define('app-showcase-material', MaterialShowcaseComponent)
