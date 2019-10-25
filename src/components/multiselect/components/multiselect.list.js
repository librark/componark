import { Component } from '../../component'

export class MultiselectList extends Component {
	/**
	 * @param {{items,	template?}} context
	 */
	init(context) {
		this.items = this.items = context['items'] || []
		this.template = context['template'] || (data => `${data}`)

		// -------------------------------------------------------------------------
		this.itemPosition = -1

		return super.init()
	}

	render() {
		this.items = this.items

		return super.render()
	}

	load() {
		return super.load()
	}

	// ---------------------------------------------------------------------------
	/** @param {MouseEvent} event */
	onClick(event) {
		event.stopImmediatePropagation()

		const target = /** @type {HTMLElement} */ (event.target)
		const item = this.items[parseInt(target.id)]
		this._dispatchEventSelected(item)
	}

	selectActiveItem() {
		const target = this.querySelector('[active]')
		if (!target) return

		const item = this.items[parseInt(target.id)]
		this._dispatchEventSelected(item)
	}

	open() {
		this.setAttribute('show', 'show')
	}

	close() {
		this.removeAttribute('show')
	}

	// ---------------------------------------------------------------------------

	/** @param {number} value */
	set itemPosition(value) {
		if (value == this.items.length) {
			this._itemPosition = 0
		} else if (value < 0) {
			this._itemPosition = this.items.length - 1
		} else {
			this._itemPosition = value
		}

		this._activateItem(this.querySelector(`[id="${this._itemPosition}"]`))
	}

	/** @returns {number} */
	get itemPosition() {
		return this._itemPosition
	}

	/** @param {Array<any>} value */
	set items(value) {
		this._items = value

		if (!this.items.length) {
			this.innerHTML = /* html */ `
				<span class="ark-multiselect-list__no-options">Sin Opciones</span>
			`
			return
		}

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
	}

	/** @return {Array<any>} */
	get items() {
		return this._items || []
	}

	// ---------------------------------------------------------------------------

	_dispatchEventSelected(item) {
		if (!item) return

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
	_activateItem(item) {
		this._removeActiveItems()

		if (!item) return

		item.setAttribute('active', 'active')
	}

	_removeActiveItems() {
		const activeItems = this._getActiveItems()
		activeItems.forEach(item => {
			item.removeAttribute('active')
		})
	}

	/** @returns {Array<HTMLLinkElement>} */
	_getActiveItems() {
		return /** @type {Array<HTMLLinkElement>} */ ([
			...this.querySelectorAll('li[active]')
		])
	}
}
customElements.define('ark-multiselect-list', MultiselectList)
