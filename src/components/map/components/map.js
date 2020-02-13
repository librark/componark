import { Map as MapOL, View } from 'ol'

import { Component } from "../../component"
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'
import { fromLonLat } from 'ol/proj'

export class Map extends Component {
  init(context = {}) {
    this.lat = parseFloat(context["lat"] || this.lat || 2.44073)
    this.lon = parseFloat(context["lon"] || this.lon || -76.602349)
    this.zoom = parseInt(context["zoom"] || this.zoom || 13)
    this.token = context["token"] || this.token

    return super.init()
  }

  reflectedProperties() {
    return ["token", "zoom", "lat", "lon"]
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
        center: fromLonLat([this.lon, this.lat]),
        zoom: this.zoom
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
