export class CardHeaderSubtitle extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    const subtitle = this.innerText
    this.innerHTML = /* html */`
        <h4>${subtitle}</h4>
    `
  }
}
customElements.define('ark-card-header-subtitle', CardHeaderSubtitle)
