import { Component } from '../../../components/component'

export class ArkDetailExample extends Component {
	init (context) {
		const data = context['data'] || {}

		this.first = data['first']
		this.second = data['second']
		this.year = data['year']

		return super.init()
	}

	render () {
		if (this.first) {
			this.innerHTML = /* html */ `
        <h1>${this.year}</h1>
        <p>
          <span data-first>FIRST: ${this.first}</span>
          <span> | </span>
          <span data-second>SECOND: ${this.second}</span>
        </p>
      `
		} else {
			this.innerHTML = /* html */ `
        <h1>Ark Detail Example</h1>
      `
		}

		return super.render()
	}
}
customElements.define('ark-detail-example', ArkDetailExample)
