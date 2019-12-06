import { Component } from '../../component'

export class Map extends Component {
  init (context = {}) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */`
      <h1>Map</h1>
    `
    return super.render()
  }

  load () {
    return super.load()
  }
}
customElements.define('ark-map', Map)
