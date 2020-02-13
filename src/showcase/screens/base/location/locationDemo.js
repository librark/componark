import { Component, Location, Map } from "../../loader"

export class LocationDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}
      <ark-location></ark-location>
      <ark-map token="${this.token}"></ark-map>
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

  get token() {
    return 'pk.' +
      'eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.' +
      'zA2W0IkI0c6KaAhJfk9bWg'
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
