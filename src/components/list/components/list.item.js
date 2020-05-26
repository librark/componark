import { Component } from '../../component'

export class ListItem extends Component {
	init (context = {}) {
		this.index = context.index
		this.data = context.data || null
		this.template = context.template || (data => `${data}`)

		return super.init()
	}

	reflectedProperties () {
		return ['index']
	}

	render () {
		this.innerHTML = this.template(this.data)
		this.addEventListener('click', this._onSelected.bind(this))

		return super.render()
	}

	/** @param {Event} event */
	_onSelected (event) {
		event.stopImmediatePropagation()
		if (this.hasAttribute('click-disabled')) return

		this.dispatchEvent(
			new CustomEvent('list-item:selected', {
				bubbles: true,
				detail: {
					data: this.data,
					index: parseInt(this.index),
					origin: event
				}
			})
		)
	}
}
customElements.define('ark-list-item', ListItem)
