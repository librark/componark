import { Component } from '../../loader'

export class ArkDetailExample extends Component {
	init (context) {
		const data = context['data'] || {}

		this.first = data['first']
		this.second = data['second']
		this.year = data['year']

		return super.init()
	}

	render () {
		this.innerHTML = this.first ? /* html */ `${this.styles}
        <h1>${this.year}</h1>
        <p>
          <span data-first>FIRST: ${this.first}</span>
          <span> | </span>
          <span data-second>SECOND: ${this.second}</span>
        </p>
      ` : /* html */ `
        <h1>Ark Detail Example</h1>
      `

		return super.render()
	}

	get styles () {
		return /* html */`
      <style></style>
    `
	}
}
customElements.define('ark-detail-example', ArkDetailExample)
