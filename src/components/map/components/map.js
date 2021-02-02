import { uuid } from '../../../base/utils'
import { Component } from '../../../base/component'
import * as leaflet from 'leaflet'
// @ts-ignore
import icon from '../assets/icons/marker-icon.png'

export class Map extends Component {
  init (context = {}) {
    this.lat = parseFloat(context.lat || this.lat || 2.44073)
    this.lon = parseFloat(context.lon || this.lon || -76.602349)
    this.zoom = parseInt(context.zoom || this.zoom || 13)
    this.token = context.token || this.token

    // Local
    this.mapId = uuid()
    this.global = context.global || window
    this.map = this.map

    return super.init()
  }

  reflectedProperties () {
    return ['token', 'zoom', 'lat', 'lon']
  }

  render () {
    this.innerHTML = /* html */ `
      <div id="${this.mapId}" class="map"></div>
    `
    this.renderMap()
    return super.render()
  }

  async load () {
    this.map.addEventListener('load', this.updateSize.bind(this))
    this.map.addEventListener('resize', this.updateSize.bind(this))
    this.global.addEventListener('resize', this.updateSize.bind(this))
  }

  disconnectedCallback () {
    this.map.removeEventListener('load', this.updateSize())
    this.map.removeEventListener('resize', this.updateSize())
    this.global.removeEventListener('resize', _ => this.updateSize())
  }

  renderMap () {
    this.map = this.mapLib.map(this.mapId)
    this.mapLib.tileLayer(this.urlTemplate()).addTo(this.map)
    this.map.setView([this.lat, this.lon], this.zoom)
    this.updateSize()
  }

  updateSize () {
    const width = this.offsetWidth
    const height = this.offsetHeight

    this.mapContainer.style.width = `${width}px`
    this.mapContainer.style.height = `${height}px`

    this.map.invalidateSize()
  }

  addMarker (lat, lon) {
    this.mapLib.marker([lat, lon], {
      icon: this.mapLib.divIcon({
        html: /* html */`<img src="${icon}"/>`,
      })
    }).addTo(this.map)

    this.updateSize()
  }

  urlTemplate () {
    return 'https://api.mapbox.com/styles/v1/mapbox/' +
      `streets-v11/tiles/256/{z}/{x}/{y}?access_token=${this.token}`
  }

  get mapContainer () {
    return /** @type {HTMLDivElement} */ (
      this.querySelector(`[id="${this.mapId}"]`)
    )
  }

  get mapLib () {
    return leaflet
  }
}
Component.define('ark-map', Map)
