import "leaflet/dist/leaflet.js"
import "leaflet/dist/leaflet.css"

import * as L from "leaflet"

import { Component } from "../../component"
// @ts-ignore
import icon from "leaflet/dist/images/marker-icon.png"
// @ts-ignore
import iconShadow from "leaflet/dist/images/marker-shadow.png"

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
      <div id="map-container"></div>
    `

    this.map = this.api.map("map-container").setView(this.center, 15)

    this.api
      .tileLayer(
        "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" +
          `?access_token=${this.token}`
      )
      .addTo(this.map)

    this.api.control.scale().addTo(this.map)

    this._defaultMarkerIconUrl()

    return super.render()
  }

  load() {
    return super.load()
  }

  // ---------------------------------------------------------------------------

  get api() {
    return L
  }

  // ---------------------------------------------------------------------------

  _defaultMarkerIconUrl() {
    const defaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    })

    this.api.Marker.prototype.options.icon = defaultIcon
  }
}
customElements.define("ark-map", Map)
