import { Component, Map } from "../../loader"

export class MapDemo extends Component {
  init(context) {
    return super.init({})
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}
      <ark-map token="${this.token}" zoom="2"></ark-map>

      <a href="https://openlayers.org/">openlayers</a>
    `

    return super.render()
  }

  load() {
    setTimeout(_ => { this.map.updateSize() }, 800)

    return super.load()
  }

  // ---------------------------------------------------------------------------

  /** @returns {Map} */
  get map() {
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
        demo-map { }
      </style>
    `
  }
}
customElements.define("demo-map", MapDemo)
