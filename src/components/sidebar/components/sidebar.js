import { Component } from '../../component'
import { getSlots } from '../../../utils'

export class Sidebar extends Component {
  init (context = {}) {
    // local variables
    this.slots = this.slots || getSlots(this)

    return super.init()
  }

  reflectedProperties () {
    return ['opened']
  }

  render () {
    this.innerHTML = /* html */`
      <div class="ark-sidebar__menu">
        <div>
          <div class="ark-sidebar__header"></div>
          <div class="ark-sidebar__body"></div>
        </div>

        <div class="ark-sidebar__footer"></div>
      </div>
      <div class="ark-sidebar__scrim" listen on-click="close"></div>
    `

    this._renderContent('header', '.ark-sidebar__header')
    this._renderContent('general', '.ark-sidebar__body')
    this._renderContent('footer', '.ark-sidebar__footer')

    if (this.hasAttribute('opened')) this.open()

    return super.render()
  }

  open () {
    this.classList.add('ark-sidebar--opened')
  }

  close () {
    this.classList.remove('ark-sidebar--opened')
  }

  toggle () {
    this.classList.toggle('ark-sidebar--opened')
  }

  _renderContent (slotKey, containerClass) {
    const container = /** @type {HTMLEmbedElement} */(
      this.querySelector(containerClass)
    )

    const slots = /** @type {Array<HTMLElement>} */(this.slots[slotKey] || [])

    if (!slots.length) container.remove()

    slots.forEach(element => container.append(element))
  }
}
customElements.define('ark-sidebar', Sidebar)
