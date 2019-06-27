import { Component } from '../../component'
import { getSlots } from '../../../utils'

export class ListItem extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    const slots = getSlots(this)

    this.innerHTML = /* html */`
      <div class="general">
        ${this._getSlots('start', slots)}
        ${this._getSlots('general', slots)}
      </div>
      <div class="end">
        ${this._getSlots('end', slots)}
      </div>
    `

    return super.render()
  }

  _getSlots (key, slots) {
    if (!slots[key]) { return '' }

    return /* HTML */`
        ${slots[key].map((element, index) => `
          ${element.outerHTML}
        `).join('')}
      `
  }
}
customElements.define('ark-list-item', ListItem)
