
export class BaseComponent extends HTMLElement {
  init () {
    return this
  }

  connectedCallback () {
    this.root = this
    this.render()
  }

  render () {
    this.root.innerHTML = /* html */`
    <h1>Hello World</h1>
    `
  }
}
customElements.define('app-base', BaseComponent)
