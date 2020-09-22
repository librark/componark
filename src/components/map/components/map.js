import { Feature, Map as MapOL, View } from 'ol'
import { Icon, Style } from 'ol/style'
import { Vector as VectorSource, XYZ } from 'ol/source'

import { Component } from '../../component'
import { Point } from 'ol/geom'
import TileLayer from 'ol/layer/Tile'
import { Vector as VectorLayer } from 'ol/layer'
import { fromLonLat } from 'ol/proj'
// @ts-ignore
import icon from '../assets/icons/marker-icon.png'

export class Map extends Component {
  init (context = {}) {
    this.lat = parseFloat(context.lat || this.lat || 2.44073)
    this.lon = parseFloat(context.lon || this.lon || -76.602349)
    this.zoom = parseInt(context.zoom || this.zoom || 13)
    this.token = context.token || this.token

    return super.init()
  }

  reflectedProperties () {
    return ['token', 'zoom', 'lat', 'lon']
  }

  render () {
    this.innerHTML = /* html */ `
      <div id="map" class="map"></div>
    `
    return super.render()
  }

  load () {
    /** @type {MapOL} */
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
  }

  updateSize () {
    this.map.renderSync()
    this.map.updateSize()
  }

  addMarker (lat, lon) {
    var iconFeature = new Feature({
      geometry: new Point(fromLonLat([lon, lat]))
    })

    iconFeature.setStyle(new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: icon
      })
    }))

    var vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [iconFeature]
      })
    })

    this.map.addLayer(vectorLayer)

    this.updateSize()
  }

  _getUrl () {
    return 'https://api.mapbox.com/styles/v1/mapbox/' +
      `streets-v11/tiles/256/{z}/{x}/{y}?access_token=${this.token}`
  }
}
customElements.define('ark-map', Map)
