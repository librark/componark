/** @typedef {import('./multiselect.item').MultiselectItem} MultiselectItem */

import { Component } from '../../component'
import { MultiselectItem } from './multiselect.item'

export class Multiselect extends Component {
	/**
	 * @param {{
	 * 	items: any[],
	 * 	label: string,
	 * 	template: void
	 * } | {}} context
	 */
	init(context = {}) {
		this.items = context['items'] || this.items || []
		this.label = context['label'] || this.label || 'label'
		this.template = context['template'] || (data => `${data}`)

		// -------------------------------------------------------------------------
		/** @type {Array} */
		this.selectedItems = this.selectedItems || []

		return super.init()
	}

	render() {
		this.innerHTML = /* html */ `
			<div class="ark-multiselect__label">
				<small>${this.label}</small>
			</div>
			<div listen on-click="onSelectInput" class="ark-multiselect__body">
				<div class="ark-multiselect__input" data-input-content>
					<input data-input type="text" listen on-keydown="search"/>
				</div>
				<div class="ark-multiselect__actions">
					<button class="ark-multiselect__remove-all"
					 listen on-click="onRemoveAll">&times;</button>
				</div>
			</div>
			<div data-items class="ark-multiselect__items">
				${this._getListItems()}
			</div>
		`

		this._renderSelectedList()
		return super.render()
	}

	load() {
		this.addEventListener(
			'multiselect-item:remove',
			this.onRemoveItem.bind(this)
		)

		return super.load()
	}

	// ---------------------------------------------------------------------------

	/** @param {event} event */
	onSelectedItem(event) {
		event.stopImmediatePropagation()

		const target = /** @type {MultiselectItem} */ (event.target)
		const item = this.items[parseInt(target.id)]
		this.selectedItems.unshift(item)
		this.render()
	}

	/** @param {event} event */
	onRemoveAll(event) {
		event.stopImmediatePropagation()
		this.selectedItems = []

		this.render()
	}

	/** @param {CustomEvent} event */
	onRemoveItem(event) {
		event.stopImmediatePropagation()
		const index = event.detail.index

		this.selectedItems.splice(index, 1)

		this.render()
	}

	/** @param {event} event */
	onSelectInput(event) {
		event.stopImmediatePropagation()

		const input = /** @type {HTMLInputElement} */ (this.querySelector(
			'[data-input]'
		))

		this._selectedItem(!input.hasAttribute('selected'))
	}

	_selectedItem(selected) {
		const input = /** @type {HTMLInputElement} */ (this.querySelector(
			'[data-input]'
		))

		const items = /** @type {HTMLDivElement} */ (this.querySelector(
			'[data-items]'
		))

		if (selected) {
			input.setAttribute('selected', 'true')
			input.focus()
			items.style.display = 'block'
		} else {
			input.removeAttribute('selected')
			input.blur()
			items.style.display = 'none'
		}
	}

	// ---------------------------------------------------------------------------
	/** @param {KeyboardEvent} event */
	search(event) {
		event.stopImmediatePropagation()

		const input = /** @type {HTMLInputElement} */ (event.target)
		const value = input.value

		if (!value.length && event.key === 'Backspace') {
			this.selectedItems.shift()
			this.render()
			this._selectedItem(true)
		}
	}

	// ---------------------------------------------------------------------------

	/** @returns {string} */
	_getListItems() {
		let items = ''

		this.items.forEach((item, index) => {
			if (!this._isSelected(item)) {
				items += /* html */ `
					<li listen on-click="onSelectedItem" id="${index}" type="none">
						${this.template(item)}
					</li>
				`
			}
		})

		if (!items.length) {
			return /* html */ `
				<span class="ark-multiselect__no-options">Sin Opciones</span>
			`
		}

		return /* html */ `
			<ul>
				${items}
			</ul>
		`
	}

	_isSelected(item) {
		for (const selectedItem of this.selectedItems) {
			if (JSON.stringify(selectedItem) === JSON.stringify(item)) return true
		}

		return false
	}

	_renderSelectedList() {
		const body = this.querySelector('[data-input-content]')
		const items = this.selectedItems

		if (!body || !items.length) return

		items.forEach((item, index) => {
			const multiselectItem = new MultiselectItem()

			multiselectItem.init({
				index: index,
				data: item,
				template: this.template
			})

			body.prepend(multiselectItem)
		})
	}
}
customElements.define('ark-multiselect', Multiselect)
