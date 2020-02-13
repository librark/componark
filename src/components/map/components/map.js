import * as ol from 'ol'

import { Map as MapOL, View } from 'ol'
import { OSM, TileDebug, XYZ } from 'ol/source'

import { Component } from "../../component"
import TileLayer from 'ol/layer/Tile'

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
            url:
              'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg'
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    })
    this.map.renderSync()

    return super.load()
  }

  // ---------------------------------------------------------------------------
}
customElements.define("ark-map", Map)
