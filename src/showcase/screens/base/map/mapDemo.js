import { Component, Map } from "../../loader"

export class MapDemo extends Component {
  init(context) {
    return super.init({})
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}
      <ark-map token="${this.token}" zoom="3"></ark-map>
    `

    return super.render()
  }

  load() {
    return super.load()
  }

  // ---------------------------------------------------------------------------

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
        demo-map { }
      </style>
    `
  }
}
customElements.define("demo-map", MapDemo)
