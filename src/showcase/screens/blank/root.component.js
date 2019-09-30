import { Component } from '../loader'

export class RootComponent extends Component {
	init (context) {
		return super.init()
	}

	render () {
		return super.render()
	}

	load () {
		return super.load()
	}
}
customElements.define('app-root', RootComponent)
