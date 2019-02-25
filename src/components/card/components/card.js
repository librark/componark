import './card.header'
import './card.content'
import './card.image'

export class Card extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    const children = Array.from(this.children)
    this.innerHTML = /* html */`
    ${children.map((element) => element.outerHTML).join('')}
    `
  }
}
customElements.define('ark-card', Card)
