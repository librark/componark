import { getSlots } from '../../utils/slots'

export class Card extends HTMLElement {
  connectedCallback () {
    this.root = this
    this.render()
  }

  render () {
    const slots = getSlots(this)
    const general = slots.general || []
    const header = slots.header || []
    const content = slots.content || []

    this.root.innerHTML = /* html */`
    <div class="ark-card__header">
      ${header.map((element) => element.outerHTML).join('')}
    </div>
    <div class="ark-card__content">
      ${content.map((element) => element.outerHTML).join('')}
      ${general.map((element) => element.outerHTML).join('')}
    </div>
    `
  }
}
customElements.define('ark-card', Card)
