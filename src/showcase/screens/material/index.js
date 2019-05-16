import ArkShowcase from '../app/showcase'
// style
import './main.scss'

export class MaterialScreen extends ArkShowcase {
  constructor () {
    super()
    this.type = 'material'
  }
} customElements.define('app-showcase-ark', MaterialScreen)
