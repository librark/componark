import ArkShowcase from '../app/showcase'
// style
import './main.scss'

export class ArkScreen extends ArkShowcase {
  constructor () {
    super()
    this.type = 'ark'
  }
} customElements.define('app-showcase-ark', ArkScreen)
