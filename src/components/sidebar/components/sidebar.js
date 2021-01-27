import { Component } from 'base/component'
import { getSlots } from 'base/utils'
import { styles } from '../styles'

const tag = 'ark-sidebar'
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
        <div class="ark-sidebar__header"></div>
        <div class="ark-sidebar__body"></div>
        <div class="ark-sidebar__footer"></div>
      </div>
      <div class="ark-sidebar__scrim" listen on-click="close"></div>
    `

    this._renderContent('header', '.ark-sidebar__header')
    this._renderContent('general', '.ark-sidebar__body')
    this._renderContent('footer', '.ark-sidebar__footer')

    return super.render()
  }

  open () {
    this.setAttribute('opened', '')
  }

  close () {
    this.removeAttribute('opened')
  }

  toggle () {
    this.toggleAttribute('opened')
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
Component.define(tag, Sidebar, styles)
