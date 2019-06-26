import { Component } from '../../component'
import { getSlots } from '../../../utils'

export class Sidebar extends Component {
  init (context) {
    return super.init(context)
  }

  reflectedProperties () {
    return ['opened']
  }

  render () {
    this.nameElement = 'ark-sidebar'

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
      <div class="${this.nameElement}-scrim" listen on-click="close">
        ${this._getSlots('scrim')}
      </div>
    `

    if (this.hasAttribute('opened')) this.open()

    return super.render()
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
