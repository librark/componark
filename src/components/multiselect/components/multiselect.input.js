import { Component } from '../../component'
import { MultiselectItem } from './multiselect.item'

export class MultiselectInput extends Component {
  /** @param {Object} context */
  init (context = {}) {
    this.items = context.items || this.items || []
    this.template = context.template || (data => `${data}`)

    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `
			<input listen on-keydown="onkeyDown" on-blur="onBlur" on-focus="onFocus"
				on-input="onInput" data-input type="text"/>
		`

    this.items = this.items || null

    return super.render()
  }

  load () {
    this.addEventListener(
      'multiselect-item:remove',
      this.onMultiselectItemRemove.bind(this)
    )

    this.addEventListener('click', this.onClick.bind(this))
  }

  /** @param {MouseEvent} event */
  onClick (event) {
    event.stopImmediatePropagation()

    this.input.focus()
  }

  /** @param {event} event */
  onFocus (event) {
    event.stopImmediatePropagation()

    this.focused = true

    this.dispatchEvent(
      new CustomEvent('multiselect-input:focus', {
        bubbles: true
      })
    )
  }

  /** @param {event} event */
  onBlur (event) {
    event.stopImmediatePropagation()

    this.focused = false

    this.dispatchEvent(
      new CustomEvent('multiselect-input:blur', {
        bubbles: true
      })
    )
  }

  /** @param {event} event */
  onInput (event) {
    event.stopImmediatePropagation()
    this.dispatchEvent(
      new CustomEvent('multiselect-input:input', {
        bubbles: true,
        detail: this.input.value
      })
    )
  }

  /** @param {CustomEvent} event */
  onMultiselectItemRemove (event) {
    event.stopImmediatePropagation()

    const data = event.detail.data
    this.removeItem(data)
  }

  /** @param {KeyboardEvent} event */
  onkeyDown (event) {
    event.stopImmediatePropagation()

    const key = event.key

    if (!this.input.value.length && key === 'Backspace') {
      this.shiftItem()
    } else if (
      key === 'ArrowLeft' &&
      (!this.focused || !this.input.value.length)
    ) {
      this.itemPosition++
      this._selectedItemById(this.itemPosition)
    } else if (
      key === 'ArrowRight' &&
      (!this.focused || !this.input.value.length)
    ) {
      this.itemPosition--
      this._selectedItemById(this.itemPosition)
    } else if (
      key === 'Delete' &&
      (!this.focused || !this.input.value.length)
    ) {
      const item = this._getSelectedItem()
      if (!item) return
      this.removeItem(item.data)
    }

    this.dispatchEvent(
      new CustomEvent('multiselect-input:keydown', {
        bubbles: true,
        detail: {
          input: this.input.value,
          origin: event
        }
      })
    )
  }

  /** @return {HTMLInputElement} */
  get input () {
    return /** @type {HTMLInputElement} */ (this.querySelector(
      'input[data-input]'
    ))
  }

  /** @param {Array<any>} value */
  set items (value) {
    this._removeItems()
    this._items = value

    this.itemPosition = -1

    this.items.forEach((item, index) => {
      const multiselectItem = new MultiselectItem()

      multiselectItem.init({
        id: index.toString(),
        data: item,
        template: this.template
      })

      this.prepend(multiselectItem)
    })

    this.dispatchEvent(
      new CustomEvent('multiselect-input:update-items', {
        bubbles: true,
        detail: {
          items: this.items
        }
      })
    )
  }

  /** @return {Array<any>} */
  get items () {
    return this._items || []
  }

  /** @param {number} value */
  set itemPosition (value) {
    if (value >= -1 && value < this.items.length) {
      this._itemPosition = value
    }
  }

  /** @returns {number} */
  get itemPosition () {
    return this._itemPosition
  }

  /** @param {boolean} value */
  set focused (value) {
    if (value) {
      this.input.setAttribute('focused', 'true')
    } else {
      this.input.removeAttribute('focused')
    }
  }

  get focused () {
    return this.input.hasAttribute('focused')
  }

  get value () {
    return this.items
  }

  addItem (item) {
    this.items.unshift(item)
    this.items = this.items || null

    this._alter()
  }

  shiftItem () {
    this.items.shift()
    this.items = this.items || null
    this._alter()
  }

  removeItem (data) {
    this.items.splice(
      this.items.findIndex(
        item => JSON.stringify(item) === JSON.stringify(data)
      ),
      1
    )

    this._alter()

    this.items = this.items || null
  }

  clean () {
    this.items = []
    this.cleanInput()
    this._alter()
  }

  cleanInput () {
    this.input.value = ''
  }

  _alter () {
    this.dispatchEvent(
      new CustomEvent('multiselect-input:alter', {
        bubbles: true,
        detail: this.value
      })
    )
  }

  _removeItems () {
    this.selectAll('ark-multiselect-item').forEach(item => {
      item.remove()
    })
  }

  /** @param {number} id */
  _selectedItemById (id) {
    const items = /** @type {MultiselectItem[]} */ ([
      ...this.selectAll('ark-multiselect-item[selected]')
    ])

    items.forEach(item => {
      item.selected = false
    })

    const item = /** @type {MultiselectItem} */ (this.select(
      `ark-multiselect-item[id="${id}"]`
    ))

    if (item) item.selected = true

    return item
  }

  _getSelectedItem () {
    return /** @type {MultiselectItem} */ (this.select(
      'ark-multiselect-item[selected]'
    ))
  }
}
customElements.define('ark-multiselect-input', MultiselectInput)
