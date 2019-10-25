import { Component } from '../../component'

import { MultiselectItem } from './multiselect.item'

export class MultiselectInput extends Component {
	/**
	 * @param {{
	 * 	items: any[],
	 * 	template: void
	 * } | {}} context
	 */
	init(context = {}) {
		this.items = context['items'] || this.items || []
		this.template = context['template'] || (data => `${data}`)

		return super.init()
	}

	render() {
		this.innerHTML = /* html */ `
			<input data-input type="text" listen on-keydown="onkeyDown"/>
		`

		this.items = this.items

		return super.render()
	}

	load() {
		this.addEventListener('click', this.onClick.bind(this))
		this.addEventListener(
			'multiselect-item:remove',
			this.onMultiselectItemRemove.bind(this)
		)

		return super.load()
	}

	// ---------------------------------------------------------------------------
	/** @param {MouseEvent} event */
	onClick(event) {
		event.stopImmediatePropagation()

		const selected = this.input.hasAttribute('selected')

		if (selected) {
			this.input.removeAttribute('selected')
			this.input.blur()
		} else {
			this.input.setAttribute('selected', 'true')
			this.input.focus()
		}

		this.dispatchEvent(
			new CustomEvent('multiselect-input:selected', {
				bubbles: true,
				detail: {
					selected: !selected
				}
			})
		)
	}

	/** @param {CustomEvent} event */
	onMultiselectItemRemove(event) {
		event.stopImmediatePropagation()

		const data = event.detail.data

		this.items.splice(
			this.items.findIndex(
				item => JSON.stringify(item) === JSON.stringify(data)
			),
			1
		)

		this.items = this.items
	}

	/** @param {KeyboardEvent} event */
	onkeyDown(event) {
		event.stopImmediatePropagation()

		const input = /** @type {HTMLInputElement} */ (event.target)
		const value = input.value

		if (!value.length && event.key === 'Backspace') {
			this.items.shift()
			this.items = this.items
		}
	}

	// ---------------------------------------------------------------------------
	/** @return {HTMLInputElement} */
	get input() {
		return /** @type {HTMLInputElement} */ (this.querySelector(
			'input[data-input]'
		))
	}

	/** @param {Array<any>} value */
	set items(value) {
		this._removeItems()
		this._items = value

		this.items.forEach((item, index) => {
			const multiselectItem = new MultiselectItem()

			multiselectItem.init({
				index: index,
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
	get items() {
		return this._items || []
	}

	// ---------------------------------------------------------------------------

	addItem(item) {
		this.items.unshift(item)
		this.items = this.items
	}

	// ---------------------------------------------------------------------------
	_removeItems() {
		this.selectAll('ark-multiselect-item').forEach(item => {
			item.remove()
		})
	}
}
customElements.define('ark-multiselect-input', MultiselectInput)
