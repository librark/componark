import { Component } from 'base/component'

export class MapDemo extends Component {
  render () {
    this.content = /* html */ `
      <ark-map height="60vh" token="${this.token}" zoom="8"></ark-map>
      
      <div>
        <a href="https://leafletjs.com//">leafletjs</a>
      </div>

      <a class="reference" target="_blank" href="https://github.com/knowark/componark/tree/master/src/components/map/README.rst">
      * Reference
      </a>
    `
    return super.render()
  }

  get token () {
    return ('pk.eyJ1IjoiaXRudWJhcmsiLCJhIjoiY2trcHlwMXlm' + 
      'MGRrNjJ4bnlzbzRoZ2E3dCJ9.3fFQAbt-mME6ZizosagKEA')
  }

}
Component.define('demo-map', MapDemo)
