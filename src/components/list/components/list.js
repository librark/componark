/** @typedef {import('./item').ListItem} ListItem */
import { Component } from '../../component'
import { ListItem } from './item.js'

export class List extends Component {
	/** @param {Object} context */
	init (context) {
		this.source = /** @type {Array} */ (context['source'] || [])
		this.template = context['template'] || null
		this.clickDisabled = context['clickDisabled'] || false

		return super.init()
	}

	render () {
		this.innerHTML = /* html */ ``
		this.source.forEach((data, index) => {
			const item = new ListItem()
				.init({ data: data,
					template: this.template,
					index: index,
					clickDisabled: (
						this.clickDisabled || this.hasAttribute('click-disabled')
					)
				})
				.render()

			item.addEventListener('list-item:selected', this._onSelected.bind(this))

			this.appendChild(item)
		})
		return super.render()
	}

	/** @param {number} start @param {number?} deleteCount  */
	delete (start, deleteCount = 1) {
		this.source.splice(start, deleteCount)

		for (let i = start; i < deleteCount + start; i++) {
			this.select(`[index="${i}"]`).remove()
		}

		this.render()
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
