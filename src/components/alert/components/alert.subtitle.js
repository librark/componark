export class AlertSubtitle extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
      <p>${this.innerHTML}</p>
    `
  }
}
customElements.define('ark-alert-subtitle', AlertSubtitle)
