export class List extends HTMLElement {
  connectedCallback () {
    // this.render()
  }

  render () {
    this.innerHTML = /* html */``
  }
}
customElements.define('ark-list', List)
