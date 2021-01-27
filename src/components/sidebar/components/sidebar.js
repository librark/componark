import { Component } from 'base/component'
import { styles } from '../styles'

const tag = 'ark-sidebar'
export class Sidebar extends Component {
  reflectedProperties () {
    return ['opened']
  }

  render () {
    const slots = this.slots()

    this.content = /* html */`
      <div class="ark-sidebar__menu">
        <div class="ark-sidebar__header"></div>
        <div class="ark-sidebar__body"></div>
        <div class="ark-sidebar__footer"></div>
      </div>
      <div class="ark-sidebar__scrim" listen on-click="close"></div>
    `

    this._renderSlot(slots, 'header', '.ark-sidebar__header')
    this._renderSlot(slots, 'general', '.ark-sidebar__body')
    this._renderSlot(slots, 'footer', '.ark-sidebar__footer')

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

  _renderSlot (slots, key, selector) {
    const elements = slots[key] || []
    for (const element of elements) {
      this.select(selector).append(element)
    }
  }
}
Component.define(tag, Sidebar, styles)
