export class SelectOption extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
      option
    `
  }
}
customElements.define('ark-select-option', SelectOption)
