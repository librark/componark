import { Component } from '../../component'

export class MultiselectItem extends Component {
	/**
	 * @param {{index, data,	template?}} context
	 */
	init(context) {
		this.index = context['index'] || null
		this.data = context['data'] || null
		this.template = context['template'] || (data => `${data}`)

		return super.init()
	}

	render() {
		this.innerHTML = /* html */ `
			${this.template(this.data)}
			<button listen listen on-click="_onRemove" remove>&times;</button>
		`

		return super.render()
	}

	load() {
		return super.load()
	}

	// ---------------------------------------------------------------------------

	/** @param {event} event */
	_onRemove(event) {
		event.stopImmediatePropagation()
		this.dispatchEvent(
			new CustomEvent('multiselect-item:remove', {
				bubbles: true,
				detail: { index: this.index }
			})
		)
	}
}
customElements.define('ark-multiselect-item', MultiselectItem)
