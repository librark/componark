import { Component } from 'base/component'

export class MapDemo extends Component {
  init (context) {
    return super.init({})
  }

  render () {
    this.innerHTML = /* html */ `${this.styles}
      <ark-map token="${this.token}" zoom="8"></ark-map>
      <a href="https://leafletjs.com//">leafletjs</a>
    `
    return super.render()
  }

  load () {
    setTimeout(_ => { this.select('ark-map')['updateSize']() }, 800)
    return super.load()
  }

  get token () {
    return 'pk.' +
      'eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.' +
      'zA2W0IkI0c6KaAhJfk9bWg'
  }

  get styles () {
    return /* html */ `
      <style>
        demo-map { }
      </style>
    `
  }
}
Component.define('demo-map', MapDemo)
