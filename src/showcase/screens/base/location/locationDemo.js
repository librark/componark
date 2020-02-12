import { Component, Location, Map } from "../../loader"

export class LocationDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}
      <ark-location></ark-location>
      <ark-map></ark-map>
    `

    this.location.start()
    return super.render()
  }

  load() {
    this.addEventListener('onCurrentPosition', (
      /** @type {CustomEvent} */ event
    ) => {
      event.stopImmediatePropagation()
      const coords = event.detail.currentPosition.coords
      this.arkMap.api.marker([
        coords.latitude, coords.longitude
      ]).addTo(this.arkMap.map)
    })

    return super.load()
  }

  disconnectedCallback() {
    this.location.stop()
  }

  // ---------------------------------------------------------------------------

  /** @return {Location} */
  get location() {
    return /** @type {Location} */ (this.select('ark-location'))
  }

  /** @returns {Map} */
  get arkMap() {
    return /** @type {Map} */ (this.select("ark-map"))
  }

  // ---------------------------------------------------------------------------

  get styles() {
    return /* html */ `
      <style>
      </style>
    `
  }
}
customElements.define("demo-location", LocationDemo)
