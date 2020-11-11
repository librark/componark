import { Component } from '../../component'
import { MultiselectSelectedItem } from './multiselect.selected-item'


export class MultiselectSelectedList extends Component {
  /** @param {Object} context */
  init (context) {
    return super.init()
  }

  render () {
    return super.render()
  }

  load () {
    this.addEventListener('click', this.onClick.bind(this))
  }

  /** @param {MouseEvent} event */
  onClick (event) {
    event.stopImmediatePropagation()
    const target = /** @type {HTMLElement} */(event.target)
    const btnRemove = target.closest(
      'ark-multiselect-selected-item button[remove]'
    )

    if (!btnRemove) return

    const item = /** @type {MultiselectSelectedItem} */(target.parentElement)
    this.removeItem(item)
  }

  /** @param {MultiselectSelectedItem} item */
  addItem (item) {
    if (this.querySelector(`[field="${item.field}"]`)) return
    this.appendChild(item)
    this.dispatchAlerteEvent()
  }

  /** @param {MultiselectSelectedItem} item */
  removeItem (item) {
    item.remove()
    this.dispatchAlerteEvent()
  }

  dispatchAlerteEvent () {
    this.dispatchEvent(new CustomEvent('multiselect-selected-list:alter', {
      bubbles: true
    }))
  }

  get value () {
    const fields = []
    this.querySelectorAll('[field]').forEach(
      item => fields.push(item.getAttribute('field'))
    )
    return fields
  }
}
customElements.define('ark-multiselect-selected-list', MultiselectSelectedList)
