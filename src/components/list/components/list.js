import { Component } from '../../component'
import { ListItem } from './list.item'

export class List extends Component {
	/** @param {Object} context */
	init (context = {}) {
		this.source = /** @type {Array} */ (context.source) || []
		this.template = context.template || (data => `${data}`)

		return super.init()
	}

	render () {
		this.innerHTML = ''

		this.source.forEach((data, index) => {
			const item = new ListItem()

			if (this.hasAttribute('click-disabled')) {
				item.setAttribute('click-disabled', '')
			}

			item
				.init({ data: data, template: this.template, index: index })
				.render()
				.load()

			this.appendChild(item)
		})

		return super.render()
	}

	load () {
		this.addEventListener('list-item:selected', this._onSelected.bind(this))

		return super.load()
	}

	// --------------------------------------------------------------------------

	/** @param {number} start @param {number?} deleteCount  */
	delete (start, deleteCount = 1) {
		this.source.splice(start, deleteCount)

		for (let i = start; i < deleteCount + start; i++) {
			this.select(`[index="${i}"]`).remove()
		}

		this.render()
	}

	// --------------------------------------------------------------------------

	/** @param {CustomEvent} event */
	_onSelected (event) {
		event.stopImmediatePropagation()
		if (this.hasAttribute('click-disabled')) return

		const detail = event.detail || {}

		this.dispatchEvent(
			new CustomEvent('list:selected', {
				bubbles: true,
				detail: {
					data: detail.data,
					index: detail.index,
					origin: detail.origin
				}
			})
		)
	}
}
customElements.define('ark-list', List)
