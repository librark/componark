import '../../../../components/card'

export class CardDemo extends HTMLElement {
  connectedCallback () {
    this.root = this
    this.render()
  }

  render () {
    this.root.innerHTML = /* html */`
    <div class="demo-card">
        <p>This is a card</p>
        <ark-card></ark-card>
    </div>
    `
  }
}
customElements.define('demo-card', CardDemo)
