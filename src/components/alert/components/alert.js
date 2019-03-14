import { getSlots } from '../../../utils'
import Image from '../assets/close.png'

export class Alert extends HTMLElement {
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
          <button hide>
            <img src="${Image}" width="12px"/>
          </button>
        </div>
      </div>
      <div class="ark-alert__actions">
        ${this._getSlots('action')}
      </div>
    `

    this._lisen()
  }

  _getSlots (key) {
    if (!this.slots || !this.slots[key]) { return '' }

    return /* html */`
        ${this.slots[key].map((element, index) => `
          ${element.outerHTML}
        `).join('')}
      `
  }

  _lisen () {
    const btns = Array.from(this.querySelectorAll('[hide]'))
    btns.forEach(btn => btn.addEventListener('click', _ =>
      this.close()
    ))
  }

  open () {
    this.removeAttribute('hide')
  }

  close () {
    const att = document.createAttribute('hide')
    this.setAttributeNode(att)
  }

  toggle () {
    this.toggleAttribute('hide')
  }
}
customElements.define('ark-alert', Alert)
