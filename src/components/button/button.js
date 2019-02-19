export class Button extends HTMLElement {
  connectedCallback () {
    this.root = this
    this.render()
  }

  render () {
    this.root.innerHTML = /* html */`
    <button class="ark-button"></button>
    `
  }
}
customElements.define('ark-button', Button)
