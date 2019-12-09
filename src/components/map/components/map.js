import 'leaflet/dist/leaflet.js'
import 'leaflet/dist/leaflet.css'

import * as L from 'leaflet'

import { Component } from '../../component'

export class Map extends Component {
  init (context = {}) {
    this.center = context['center'] || [2.44073, -76.602349]

    return super.init()
  }

  render () {
    this.innerHTML = /* html */`
      <div id="map-container"></div>
    `

    this.map = this.api.map('map-container').setView(this.center, 15)

    this.api.tileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" +
      `?access_token=${this._getAccessToken()}`
    ).addTo(this.map)

    this.api.control.scale().addTo(this.map);

    return super.render()
  }

  load () {
    return super.load()
  }

  // ---------------------------------------------------------------------------

  get api () {
    return L
  }

  // ---------------------------------------------------------------------------

  _getAccessToken () {
    let token = ""

    token += 'pk'
    token += '.eyJ1IjoiaXRudWJhcmsiLCJhIjoiY2pzdWsyYXo0MmY4dTQzcnI0Y2ZxMGt3aCJ9'
    token += '.DPOHXK2aObjNChVAZ4_CMQ'

    return token
  }
}
customElements.define('ark-map', Map)
