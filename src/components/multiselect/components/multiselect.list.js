import { Component } from '../../component'

export class MultiselectList extends Component {
	/**
	 * @param {{items,	template?}} context
	 */
  init (context) {
    this.items = this.items = context['items'] || []
    this.template = context['template'] || (data => `${data}`)

    // ------------------------------------------------------------------------
    this.itemPosition = -1

    return super.init()
  }

  render () {
    if (this.items.length) {
      const list = _ => {
        return this.items
          .map((item, index) => {
            return /* html */ `
              <li listen on-click="onClick" type="none" id="${index}">
                ${this.template(item)}
              </li>
            `
          })
          .join('')
      }

      this.innerHTML = /* html */ `<ul>${list()}</ul>`
    } else {
      this.innerHTML = /* html */ `
				<span class="ark-multiselect-list__no-options">Sin Opciones</span>
      `
    }


    return super.render()
  }

  load () {
    this.addEventListener('mouseenter', this.onMouseEnter.bind(this))

    this.addEventListener('mouseleave', this.onMouseleave.bind(this))

    return super.load()
  }

  // --------------------------------------------------------------------------
  /** @param {MouseEvent} event */
  onMouseEnter (event) {
    event.stopImmediatePropagation()
    this.setAttribute('selected', 'true')
  }

  /** @param {MouseEvent} event */
  onMouseleave (event) {
    event.stopImmediatePropagation()
    this.removeAttribute('selected')
  }

  /** @param {MouseEvent} event */
  onClick (event) {
    event.stopImmediatePropagation()
    const target = /** @type {HTMLElement} */ (event.target)

    const id = parseInt(target.id)
    const item = this.items[id]
    this._dispatchEventSelected(item)

    this.itemPosition = -1
  }

  selectActiveItem () {
    const target = this.querySelector('[active]')
    if (!target) return

    const id = parseInt(target.id)
    const item = this.items[id]

    this.itemPosition = id - 1

    this._dispatchEventSelected(item)
  }

  open () {
    this.setAttribute('show', 'show')
  }

  close () {
    this.removeAttribute('show')
    this.itemPosition = -1
  }

  toggle () {
    if (this.hasAttribute('show')) {
      this.close()
    } else {
      this.open()
    }
  }

  // --------------------------------------------------------------------------

  /** @param {number} value */
  set itemPosition (value) {
    if (value == -1) {
      this._itemPosition = value
    } else if (value == this.items.length) {
      this._itemPosition = 0
    } else if (value < 0) {
      this._itemPosition = this.items.length - 1
    } else {
      this._itemPosition = value
    }

    this._activateItem(this.querySelector(`[id="${this._itemPosition}"]`))
  }

  /** @returns {number} */
  get itemPosition () {
    return this._itemPosition
  }

  // --------------------------------------------------------------------------

  _dispatchEventSelected (item) {
    if (!item) return

    this.close()

    this.dispatchEvent(
      new CustomEvent('multiselect-list:selected', {
        bubbles: true,
        detail: {
          item: item
        }
      })
    )
  }

  /** @param {HTMLElement} item */
  _activateItem (item) {
    this._removeActiveItems()

    if (!item) return

    item.setAttribute('active', 'active')
    item.scrollIntoView(false)
  }

  _removeActiveItems () {
    const activeItems = this._getActiveItems()
    activeItems.forEach(item => {
      item.removeAttribute('active')
    })
  }

  /** @returns {Array<HTMLLinkElement>} */
  _getActiveItems () {
    return /** @type {Array<HTMLLinkElement>} */ ([
      ...this.querySelectorAll('li[active]')
    ])
  }
}
customElements.define('ark-multiselect-list', MultiselectList)
