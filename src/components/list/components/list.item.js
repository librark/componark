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

		return super.render()
	}
}
customElements.define('ark-list-item', ListItem)
