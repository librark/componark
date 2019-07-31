// style
import './main.scss'

import Showcase from '../app/showcase'

export class MaterialScreen extends Showcase {
	constructor () {
		super()
		this.type = 'material'
	}
}
customElements.define('app-showcase-ark', MaterialScreen)
