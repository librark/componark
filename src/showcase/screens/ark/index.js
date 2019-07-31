// style
import './main.scss'

import Showcase from '../app/showcase'

export class ArkScreen extends Showcase {
	constructor () {
		super()
		this.type = 'ark'
	}
}
customElements.define('app-showcase-ark', ArkScreen)
