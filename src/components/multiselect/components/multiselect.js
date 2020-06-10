/**
 * @typedef {import('./multiselect.input').MultiselectInput} MultiselectInput
 * @typedef {import('./multiselect.item').MultiselectItem} MultiselectItem
 * @typedef {import('./multiselect.list').MultiselectList} MultiselectList
 * */

import { Component } from '../../component'

export class Multiselect extends Component {
	/** @param {Object} context */
	init (context = {}) {
		this.label = context.label || this.label || 'label'
		this.items = context.items || this.items || []
		this.template = context.template || (data => `${data}`)

		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `
			<div class="ark-multiselect__label">
				<label>${this.label}</label>
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

		this.input
			.init({
				items: [],
				template: this.template
			})
			.render()

		this.multiselectList
			.init({
				items: this._getSelectionList(this.input.items),
				template: this.template
			})
			.render()

		return super.render()
	}

	load () {
		this.addEventListener(
			'multiselect-list:selected',
			this.onMultiselectListSelected.bind(this)
		)

		this.addEventListener(
			'multiselect-input:update-items',
			this.onMultiselectInputUpdateItems.bind(this)
		)

		this.addEventListener(
			'multiselect-input:keydown',
			this.onMultiselectInputKeydown.bind(this)
		)

		this.addEventListener(
			'multiselect-input:focus',
			this.onMultiselectInputFocus.bind(this)
		)

		this.addEventListener(
			'multiselect-input:blur',
			this.onMultiselectInputBlur.bind(this)
		)

		this.addEventListener(
			'multiselect-input:alter',
			this.onMultiselectInputAlter.bind(this)
		)

		this.addEventListener(
			'multiselect-input:input',
			this.onMultiselectInputInput.bind(this)
		)
	}

	/** @param {event} event */
	onRemoveAll (event) {
		event.stopImmediatePropagation()
		this.input.clean()
	}

	/** @param {CustomEvent} event */
	onMultiselectListSelected (event) {
		event.stopImmediatePropagation()

		const item = event.detail.item

		if (!item) return

		this.input.addItem(item)
		this.input.cleanInput()
	}

	/** @param {CustomEvent} event */
	onMultiselectInputUpdateItems (event) {
		event.stopImmediatePropagation()

		if (!this.multiselectList.innerHTML.length) return

		this.multiselectList
			.init({
				items: this._getSelectionList(this.input.items),
				template: this.template
			})
			.render()
	}

	/** @param {CustomEvent} event */
	onMultiselectInputKeydown (event) {
		event.stopImmediatePropagation()

		const key = event.detail.origin.key

		if (key === 'ArrowUp') {
			this.multiselectList.open()
			this.multiselectList.itemPosition--
		} else if (key === 'ArrowDown') {
			this.multiselectList.open()
			this.multiselectList.itemPosition++
		} else if (key === 'Enter') {
			this.multiselectList.selectActiveItem()
		}
	}

	onMultiselectInputFocus (event) {
		event.stopImmediatePropagation()
		this.multiselectList.toggle()
	}

	onMultiselectInputBlur (event) {
		event.stopImmediatePropagation()

		if (!this.multiselectList.hasAttribute('selected')) {
			this.multiselectList.close()
		}
	}

	/** @param {CustomEvent} event */
	onMultiselectInputAlter (event) {
		event.stopImmediatePropagation()
		this._alter(event.detail)
	}

	/** @param {CustomEvent} event */
	onMultiselectInputInput (event) {
		event.stopImmediatePropagation()

		this.multiselectList
			.init({
				items: this._getSelectionList(this.input.items, event.detail)
			})
			.render()

		this.multiselectList.open()
	}

	/** @returns {MultiselectList} */
	get multiselectList () {
		return /** @type {MultiselectList} */ (this.select('ark-multiselect-list'))
	}

	/** @returns {MultiselectInput} */
	get input () {
		return /** @type {MultiselectInput} */ (this.select(
			'ark-multiselect-input'
		))
	}

	get value () {
		return this.input.value
	}

	_alter (value) {
		this.dispatchEvent(
			new CustomEvent('ark-multiselect:alter', {
				bubbles: true,
				detail: value
			})
		)
	}

	_getSelectionList (inputItems, value = '') {
		const currentList = []

		value = value.trim().toLowerCase()

		this.items.forEach(item => {
			const selectedItem = inputItems.find(selectedItem => {
				if (JSON.stringify(selectedItem) === JSON.stringify(item)) return true
			})

			const title = this.template(item)
				.trim()
				.toLowerCase()

			if (
				(value.length && title.indexOf(value) > -1 && !selectedItem) ||
        (!value.length && !selectedItem)
			) {
				currentList.push(item)
			}
		})

		return currentList
	}
}
customElements.define('ark-multiselect', Multiselect)
