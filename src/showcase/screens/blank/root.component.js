import { Component } from '../loader'

export class RootComponent extends Component {
	init(context) {
		return super.init()
	}

	render() {
		this.innerHTML = /* html */ `
      ${this.styles}
    `

		return super.render()
	}

	load() {
		this.dispatchEvent(
			new CustomEvent('blank:load', {
				bubbles: true
			})
		)

		return super.load()
	}

	get styles() {
		return /* html */ `
      <style>
      </style>
    `
	}
}
customElements.define('app-root', RootComponent)
