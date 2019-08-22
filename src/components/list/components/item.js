import { Component } from '../../component'

export class ListItem extends Component {
	init (context) {
		this.index = context['index']
		this.data = context['data'] || null
		this.template = context['template'] || ((data) => `${data}`)

		return super.init()
	}

	reflectedProperties () {
		return ['index']
	}

	render () {
		this.innerHTML = this.template(this.data)

		if (!this.hasAttribute('click-disabled')) {
			this.addEventListener('click', this._onSelected.bind(this))
		}

		return super.render()
	}

	/** @param {Event} event */
	_onSelected (event) {
		event.stopImmediatePropagation()

		this.dispatchEvent(
			new CustomEvent('list-item:selected', {
				detail: {
					data: this.data,
					index: this.index
				}
			})
		)
	}
}
customElements.define('ark-list-item', ListItem)
