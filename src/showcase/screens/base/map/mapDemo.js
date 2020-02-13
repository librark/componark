import { Component, Map } from "../../loader"

export class MapDemo extends Component {
  init(context) {
    return super.init({})
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}

      <ark-map token="${this.token}"></ark-map>

      <!------------------------------------>

      <hr/>

      <a href="https://leafletjs.com/">leafletjs</a>
    `

    return super.render()
  }

  load() {
    // this.arkMap.api.marker([2.44073, -76.602349]).addTo(this.arkMap.map)

    return super.load()
  }

  /** @returns {Map} */
  get arkMap() {
    return /** @type {Map} */ (this.select("ark-map"))
  }

  get token() {
    return (
      "pk" +
      ".eyJ1IjoiaXRudWJhcmsiLCJhIjoiY2pzdWsyYXo0MmY4dTQzcnI0Y2ZxMGt3aCJ9" +
      ".DPOHXK2aObjNChVAZ4_CMQ"
    )
  }

  // ---------------------------------------------------------------------------
  get styles() {
    return /* html */ `
      <style>
      </style>
    `
  }
}
customElements.define("demo-map", MapDemo)
