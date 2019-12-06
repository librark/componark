/**
 * @typedef {import('../../loader').Map} Map
 */
import { Component } from '../../loader'

export class MapDemo extends Component {
  init (context) {
    this.type = context['type'] || 'ark'
    return super.init({})
  }

  render () {
    this.innerHTML = /* html */ `
      <ark-map></ark-map>
    `

    return super.render()
  }

  load () {
    return super.load()
  }
}
customElements.define('demo-map', MapDemo)
