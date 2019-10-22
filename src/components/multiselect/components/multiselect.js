import { Component } from '../../component'

export class Multiselect extends Component {
	/**
	 * @param {{selectItems: {label: string, value: string}[]} | {}} context
	 */
	init(context = {}) {
		this.selectItems = context['selectItems'] || this.selectItems || []

		return super.init()
	}

	render() {
		this.innerHTML = /* html */ `
			<h1>multiselect</h1>
		`

		return super.render()
	}

	load() {
		return super.load()
	}
}
customElements.define('ark-multiselect', Multiselect)
