import { Component } from '../../../base/component'
import { uuid } from '../../../base/utils'
import * as leaflet from 'leaflet'
import { styles } from '../styles'
// @ts-ignore
import defaultIcon from '../assets/icons/marker-icon.png'

const tag = 'ark-map'
export class Map extends Component {
  init(context = {}) {
    this.global = context.global || window
    this.lat = parseFloat(context.lat || this.lat || 2.44073)
    this.lon = parseFloat(context.lon || this.lon || -76.602349)
    this.zoom = parseInt(context.zoom || this.zoom || 13)
    this.token = context.token || this.token
    this.mapId = this.mapId || `map-${uuid()}`
    this.map = this.map || null
    this.width = context.width || this.width || '100%'
    this.height = context.heigth || this.height || '50vh'

    return super.init()
  }

  reflectedProperties() {
    return ['token', 'width', 'height', 'lat', 'lon', 'zoom']
  }

  render() {
    this.style.height = this.height
    this.style.width = this.width
    this.content = /* html */ `
    <div class="map-styles">
       <link rel="stylesheet" 
      href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
      integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
      crossorigin=""/>
    </div>
    <div id="${this.mapId}" class="ark-map__map"></div>
    `
    this.map = this.lib.map(this.mapId)
    this.lib.tileLayer(this.urlTemplate).addTo(this.map)
    this.map.setView([this.lat, this.lon], this.zoom)
    return super.render()
  }

  load() {
    this.refreshMap()
  }

  refreshMap() {
    setTimeout(() => {
      this.global.dispatchEvent(new Event('resize'))
    }, 100)
  }

  addMarker(lat, lon, imageURL) {
    const marker = this.lib
      .marker([lat, lon], {
        icon: this.lib.divIcon({
          html: /* html */ imageURL
            ? `<div class="ark-map__icon--image" style="background-image: url(${imageURL});"/>`
            : `<img src="${defaultIcon}"/>`,
          iconSize: [50, 50],
          className: 'ark-map__icon',
        }),
      })
      .addTo(this.map)
  }

  get urlTemplate() {
    return (
      'https://api.mapbox.com/styles/v1/mapbox/' +
      `streets-v11/tiles/256/{z}/{x}/{y}?access_token=${this.token}`
    )
  }

  get lib() {
    return leaflet
  }
}
Component.define(tag, Map, styles)
