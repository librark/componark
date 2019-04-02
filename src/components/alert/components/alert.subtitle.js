export class AlertSubtitle extends HTMLElement {
  init (context) {
    return this
  }

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
