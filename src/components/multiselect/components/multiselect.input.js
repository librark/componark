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
			<input listen on-keydown="onkeyDown" on-blur="onBlur" data-input
			 type="text"/>
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

		this.selected = !this.selected
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

		this.selected = true
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

	/** @param {CustomEvent} event */
	onBlur(event) {
		event.stopImmediatePropagation()
		this.selected = false
	}

	// ---------------------------------------------------------------------------
	/** @param {boolean} select */
	set selected(select) {
		if (select) {
			this.setAttribute('selected', 'true')
			this.input.setAttribute('selected', 'true')
			this.input.focus()
		} else {
			this.removeAttribute('selected')
			this.input.removeAttribute('selected')
		}

		this.dispatchEvent(
			new CustomEvent('multiselect-input:selected', {
				bubbles: true,
				detail: {
					selected: this.selected
				}
			})
		)
	}

	/** @return {boolean} */
	get selected() {
		return this.hasAttribute('selected')
	}

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
		this.selected = true
	}

	// ---------------------------------------------------------------------------
	_removeItems() {
		this.selectAll('ark-multiselect-item').forEach(item => {
			item.remove()
		})
	}
}
customElements.define('ark-multiselect-input', MultiselectInput)
