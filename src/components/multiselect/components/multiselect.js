/**
 * @typedef {import('./multiselect.input').MultiselectInput} MultiselectInput
 * @typedef {import('./multiselect.item').MultiselectItem} MultiselectItem
 * @typedef {import('./multiselect.list').MultiselectList} MultiselectList
 *  */

import { Component } from '../../component'

import { MultiselectList } from './multiselect.list'
import { MultiselectInput } from './multiselect.input'

export class Multiselect extends Component {
	/**
	 * @param {{
	 * 	items: any[],
	 * 	label: string,
	 * 	template: void
	 * } | {}} context
	 */
	init(context = {}) {
		this.label = context['label'] || this.label || 'label'
		this.items = context['items'] || this.items || []
		this.template = context['template'] || (data => `${data}`)

		return super.init()
	}

	render() {
		this.innerHTML = /* html */ `
			<div class="ark-multiselect__label">
				<small>${this.label}</small>
			</div>
			<div class="ark-multiselect__body">
				<ark-multiselect-input></ark-multiselect-input>
				<div class="ark-multiselect__actions">
					<button class="ark-multiselect__remove-all"
					 listen on-click="onRemoveAll">&times;</button>
				</div>
			</div>

			<ark-multiselect-list></ark-multiselect-list>
		`

		this.multiselectList
			.init({
				items: this._getSelectionList(this.input.items),
				template: this.template
			})
			.render()

		this.input
			.init({
				items: [],
				template: this.template
			})
			.render()

		return super.render()
	}

	load() {
		this.addEventListener(
			'multiselect-list:selected',
			this.onMultiselectListSelected.bind(this)
		)

		this.addEventListener(
			'multiselect-input:selected',
			this.onMultiselectInputSelected.bind(this)
		)

		this.addEventListener(
			'multiselect-input:update-items',
			this.onMultiselectInputUpdateItems.bind(this)
		)

		return super.load()
	}

	// ---------------------------------------------------------------------------

	/** @param {event} event */
	onRemoveAll(event) {
		event.stopImmediatePropagation()
		this.input.items = []
	}

	/** @param {CustomEvent} event */
	onMultiselectListSelected(event) {
		event.stopImmediatePropagation()

		const item = event.detail.item

		if (item) this.input.addItem(item)
	}

	/** @param {CustomEvent} event */
	onMultiselectInputSelected(event) {
		event.stopImmediatePropagation()
		const selected = event.detail.selected

		if (selected) {
			this.multiselectList.open()
		} else {
			this.multiselectList.close()
		}
	}

	/** @param {CustomEvent} event */
	onMultiselectInputUpdateItems(event) {
		event.stopImmediatePropagation()

		if (!this.multiselectList.innerHTML.length) return

		this.multiselectList
			.init({
				items: this._getSelectionList(this.input.items),
				template: this.template
			})
			.render()
	}

	// ---------------------------------------------------------------------------

	/** @returns {MultiselectList} */
	get multiselectList() {
		return /** @type {MultiselectList} */ (this.select('ark-multiselect-list'))
	}

	/** @returns {MultiselectInput} */
	get input() {
		return /** @type {MultiselectInput} */ (this.select(
			'ark-multiselect-input'
		))
	}

	// ---------------------------------------------------------------------------

	_getSelectionList(inputItems) {
		const currentList = []

		this.items.forEach(item => {
			const selectedItem = inputItems.find(selectedItem => {
				if (JSON.stringify(selectedItem) === JSON.stringify(item)) return true
			})

			if (!selectedItem) currentList.push(item)
		})

		return currentList
	}
}
customElements.define('ark-multiselect', Multiselect)
