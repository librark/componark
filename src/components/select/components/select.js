export class Select extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
        <select name="" id=""></select>
    `
  }
}
customElements.define('ark-select', Select)
