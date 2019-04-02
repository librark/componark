import { getSlots } from '../../../utils'

export class Sidebar extends HTMLElement {
  init (context) {
    return this
  }

  connectedCallback () {
    this.nameElement = 'ark-sidebar'

    this.render()
  }

  get opened () {
    return this.hasAttribute('opened')
  }

  render () {
    this.slots = getSlots(this)

    this.innerHTML = /* html */`
      <div class="${this.nameElement}-menu">
        <div>
          ${this._getContent('header', `${this.nameElement}-menu-header`)}
          <div class="${this.nameElement}-menu-body">
          ${this._getSlots('general')}
          </div>
        </div>
        ${this._getContent('footer', `${this.nameElement}-menu-footer`)}
      </div>
      <div class="${this.nameElement}-scrim">
        ${this._getSlots('scrim')}
      </div>
    `

    if (this.opened) this.open()

    this._listen()
  }

  _listen () {
    this.querySelector(`.${this.nameElement}-scrim`).addEventListener(
      'click', _ => this.close()
    )
  }

  _getContent (key, className) {
    const slots = this._getSlots(key)

    if (slots === '') { return '' }

    return /* html */`
      <div class="${className}">
        ${slots}
      </div>
    `
  }

  _getSlots (key) {
    if (!this.slots[key]) { return '' }

    return /* html */`
        ${this.slots[key].map((element, index) => `
          ${element.outerHTML}
        `).join('')}
      `
  }

  open () {
    this.classList.add(`${this.nameElement}--opened`)
  }

  close () {
    this.classList.remove(`${this.nameElement}--opened`)
  }

  toggle () {
    this.classList.toggle(`${this.nameElement}--opened`)
  }
}
customElements.define('ark-sidebar', Sidebar)
