export class ModalSubtitle extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
      <p>${this.innerHTML}</p>
    `
  }
}
customElements.define('ark-modal-subtitle', ModalSubtitle)
