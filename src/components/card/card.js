
export class Card extends HTMLElement {
  connectedCallback () {
    this.root = this
    this.render()
  }

  render () {
    this.root.innerHTML = /* html */`
        <div class="ark-card">
          <p>ARK CARD</p>
        </div>
        `
  }
}
customElements.define('ark-card', Card)
