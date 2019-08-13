import { Component } from '../../component'

export class ListItem extends Component {
	init (context) {
		this.index = context['index']
		this.data = context['data'] || null
		this.template = context['template'] || (data => `${data}`)

		this.clickDisabled = context['clickDisabled'] || false

		return super.init()
	}

	reflectedProperties () {
		return ['index', 'clickDisabled']
	}

	render () {
		this.innerHTML = this.template(this.data)

		if (this.clickDisabled === 'false') {
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
					data: this.data
				}
			})
		)
	}
}
customElements.define('ark-list-item', ListItem)
