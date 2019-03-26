import { getSlots } from '../../../utils'

export class Modal extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.slots = getSlots(this)

    this.innerHTML = /* html */`
      <div class="ark-modal__scrim"></div>
      <div class="ark-modal__content" ${this._getAttributes()}>
        <div class="ark-modal__header">
          <div class="ark-modal__title">
            <h3>
              ${this._getSlots('title')}
            </h3>
            <span>
              ${this._getSlots('subtitle')}
            </span>
          </div>
          <div class="ark-modal__icon-close">
            <button close>&times;</button>
          </div>
        </div>
        <div class="ark-modal__body">
          ${this._getSlots('general')}
        </div>
        <div class="ark-modal__actions">
          ${this._getSlots('action')}
        </div>
      </div>
    `

    this._listen()
    this._removeAttribute()
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

    const scrim = this.querySelector('.ark-modal__scrim')
    scrim.addEventListener('click', _ =>
      this.close()
    )
  }

  _getAttributes () {
    const attributes = Array.from(this.attributes)

    return attributes.map((attribute) => {
      var attr = `${attribute.name}`
      if (attribute.value) attr += `=${attribute.value}`
      return attr !== 'hidden' ? attr : ''
    }).join(' ')
  }

  _removeAttribute () {
    let i = 0
    while (this.attributes.length > i) {
      const name = this.attributes[i].name
      if (name === 'hidden') {
        i++
        break
      }
      this.removeAttribute(name)
    }
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
customElements.define('ark-modal', Modal)
