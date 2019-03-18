export class CardHeaderTitle extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    const title = this.innerText
    this.innerHTML = /* html */`
      <h3>${title}</h3>
    `
  }
}
customElements.define('ark-card-header-title', CardHeaderTitle)
