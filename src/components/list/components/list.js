/** @typedef {import('./item').ListItem} ListItem */
import { Component } from '../../component'
import { ListItem } from './item.js'

export class List extends Component {
	/** @param {Object} context */
	init (context) {
		this.source = context['source'] || null
		this.template = context['template'] || null

		return super.init()
	}

	render () {
		this.innerHTML = /* html */ ``
		this.source.forEach(data => {
			const item = new ListItem()
				.init({ data: data, template: this.template })
				.render()

			item.addEventListener('list-item:selected', this._onSelected.bind(this))

			this.appendChild(item)
		})
		return super.render()
	}

	/** @param {Event} event */
	_onSelected (event) {
		event.stopImmediatePropagation()
		const data = event['detail'] ? event['detail'].data : {}
		this.dispatchEvent(
			new CustomEvent('list:selected', {
				detail: data
			})
		)
	}
}
customElements.define('ark-list', List)
