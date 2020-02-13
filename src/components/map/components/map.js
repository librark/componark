import { Map as MapOL, View } from 'ol'

import { Component } from "../../component"
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'

export class Map extends Component {
  init(context = {}) {
    this.center = context["center"] || [2.44073, -76.602349]
    this.token = context["token"] || this.token

    return super.init()
  }

  reflectedProperties() {
    return ["token"]
  }

  render() {
    this.innerHTML = /* html */ `
      <div id="map" class="map"></div>
    `
    return super.render()
  }

  load() {
    this.map = new MapOL({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: this._getUrl()
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    })

    return super.load()
  }

  updateSize() {
    this.map.updateSize()
  }

  // ---------------------------------------------------------------------------

  _getUrl() {
    return 'https://api.mapbox.com/styles/v1/mapbox/' +
      `streets-v11/tiles/256/{z}/{x}/{y}?access_token=${this.token}`
  }
}
customElements.define("ark-map", Map)
