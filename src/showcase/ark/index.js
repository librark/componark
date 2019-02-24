
export class ArkShowcaseComponent extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
        <p>Ark Showcase</p>
        `
  }
}
customElements.define('app-showcase-ark', ArkShowcaseComponent)
