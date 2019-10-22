import { Component } from '../../loader'

export class MultiselectDemo extends Component {
	init(context) {
		this.type = context['type'] || 'ark'
		return super.init(context)
	}

	render() {
		this.innerHTML = /* html */ `${this.styles}
			<ark-multiselect></ark-multiselect>
    `
		return super.render()
	}

	get styles() {
		return /* html */ `
      <style>
      </style>
    `
	}
}
customElements.define('demo-multiselect', MultiselectDemo)
