import { getSlots } from '../../../utils'

export class Item extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    const slots = getSlots(this)

    this.innerHTML = /* html */`
      <div class="general">
        ${this.getSlots('start', slots)}
        ${this.getSlots('general', slots)}
      </div>
      <div class="end">
        ${this.getSlots('end', slots)}
      </div>
    `
  }

  getSlots (key, slots) {
    if (!slots[key]) { return }

    return /* HTML */`
        ${slots[key].map((element, index) => `
          ${element.outerHTML}
        `).join('')}
      `
  }
}
customElements.define('ark-item', Item)
