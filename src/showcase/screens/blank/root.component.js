import { Component } from '../loader'

export class RootComponent extends Component {
	init (context) {
		return super.init()
	}

	render () {
		this.innerHTML = /* html */`
      ${this.styles}
    `

		return super.render()
	}

	load () {
		return super.load()
	}

	get styles () {
		return /* html */`
      <style>
        app-root{
          background: red;
        }
      </style>
    `
	}
}
customElements.define('app-root', RootComponent)
