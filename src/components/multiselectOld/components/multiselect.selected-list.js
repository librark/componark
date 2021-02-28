import { Component } from '../../../base/component'
import { MultiselectSelectedItem } from './multiselect.selected-item'


export class MultiselectSelectedList extends Component {
  /** @param {Object} context */
  init (context) {
    this.selectedIndex = -1
    return super.init()
  }

  render () {
    this.addEventListener('click', this.onClick.bind(this))
    return super.render()
  }

  /** @param {MouseEvent} event */
  onClick (event) {
    event.stopImmediatePropagation()
    const target = /** @type {HTMLElement} */(event.target)
    const btnRemove = target.closest(
      'ark-multiselect-selected-item button[remove]'
    )

    if (btnRemove) {
      const item = /** @type {MultiselectSelectedItem} */(target.parentElement)
      this.removeItem(item)
    } else {
      this.dispatchCustomEvent('click')
    }
  }

  /** @param {MultiselectSelectedItem} item */
  addItem (item) {
    if (this.querySelector(`[field="${item.field}"]`)) return

    if (this.selectedItems.length) {
      this.selectedItems[this.selectedItems.length - 1].after(item)
    } else {
      this.prepend(item)
    }

    this.dispatchAlerteEvent()
  }

  /** @param {MultiselectSelectedItem} item */
  removeItem (item) {
    item.remove()
    this.dispatchAlerteEvent()
  }

  removeItems () {
    this.selectedItems.forEach(item => item.remove())
    this.dispatchAlerteEvent()
  }

  selectLeft () {
    this.selectedIndex++

    if (
      this.selectedIndex > this.selectedItems.length ||
      this.selectedItems.length === this.selectedIndex
    ) this.selectedIndex = 0

    this.updateCurrentSelectedItem()
  }

  selectRight () {
    this.selectedIndex--

    if (
      this.selectedIndex > this.selectedItems.length ||
      this.selectedIndex < 0
    ) this.selectedIndex = this.selectedItems.length - 1

    this.updateCurrentSelectedItem()
  }

  updateCurrentSelectedItem () {
    if (this.selectedItem) this.selectedItem.removeAttribute('selected')
    const item = this.selectedItems[this.selectedIndex]
    if (item) item.setAttribute('selected', '')
  }

  selectedDelete () {
    if (!this.selectedItem) return
    this.selectedItem.remove()
    this.selectedIndex = -1
    this.dispatchAlerteEvent()
  }

  dispatchAlerteEvent () {
    this.dispatchCustomEvent('alter')
  }

  dispatchCustomEvent (name, detail = {}) {
    this.dispatchEvent(new CustomEvent(`multiselect-selected-list:${name}`, {
      bubbles: true, detail
    }))
  }

  clearSelectedItems () {
    this.querySelectorAll('[selected]').forEach(
      item => item.removeAttribute('selected')
    )
  }

  get selectedItem () {
    return /** @type{MultiselectSelectedItem} */(
      this.select('ark-multiselect-selected-item[selected]')
    )
  }

  get selectedItems () {
    return /** @type{MultiselectSelectedItem[]} */(Array.prototype.slice.call(
      this.selectAll('ark-multiselect-selected-item')
    )).reverse()
  }

  get value () {
    const fields = []
    this.querySelectorAll('[field]').forEach(
      item => fields.push(item.getAttribute('field'))
    )
    return fields
  }
}
Component.define('ark-multiselect-selected-list', MultiselectSelectedList)
