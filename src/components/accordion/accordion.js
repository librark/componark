import { getSlots } from '../../utils'

export class Accordion extends HTMLElement {
  init (context) {
    return this
  }

  connectedCallback () {
    this.root = this
    this.render()
  }

  render () {
    const child = this.root.querySelector('[slot]')
    const slots = getSlots(this.root)
    console.log('Children::::', child)
    console.log('SLOTS>>>', slots)

    this.root.innerHTML = /* html */`
    <div class="ark-accordion">
        <hr>
        <p>PARENT</p>

        ${slots.first.map((element, index) => `
          <span class="tab-${index}">
          ${element.outerHTML}
          </span>
        `).join('')}

    </div>
    `
    return this.root.outerHTML
  }
}
customElements.define('ark-accordion', Accordion)
