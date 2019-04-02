import { getSlots } from '../../../utils'

export class Alert extends HTMLElement {
  init (context) {
    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.slots = getSlots(this)

    this.innerHTML = /* html */`
      <div class="ark-alert__body">
        <div class="ark-alert__content">
          ${this._getSlots('general')}
        </div>
        <div class="ark-alert__icon-close">
          <button close>&times;</button>
        </div>
      </div>
      <div class="ark-alert__actions">
        ${this._getSlots('action')}
      </div>
    `

    this._listen()
  }

  _getSlots (key) {
    if (!this.slots || !this.slots[key]) { return '' }

    return /* html */`
        ${this.slots[key].map((element, index) => `
          ${element.outerHTML}
        `).join('')}
      `
  }

  _listen () {
    const btns = Array.from(this.querySelectorAll('[close]'))
    btns.forEach(btn => btn.addEventListener('click', _ =>
      this.close()
    ))
  }

  open () {
    this.removeAttribute('hidden')
  }

  close () {
    const att = document.createAttribute('hidden')
    this.setAttributeNode(att)
  }

  toggle () {
    this.getAttributeNode('hidden')
      ? this.removeAttribute('hidden')
      : this.setAttributeNode(document.createAttribute('hidden'))
  }
}
customElements.define('ark-alert', Alert)
