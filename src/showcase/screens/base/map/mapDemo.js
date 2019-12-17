/**
 * @typedef {import('../../loader').Map} Map
 */
import { Component } from '../../loader'

export class MapDemo extends Component {
  init (context) {
    this.type = context['type'] || 'ark'
    return super.init({})
  }

  render () {
    this.innerHTML = /* html */ `
      ${this.getStyle()}

      <div class="map-container">
        <ark-map token="${this.token}"></ark-map>
      </div>

      <!------------------------------------>

      <hr/>

      <a href="https://leafletjs.com/">leafletjs</a>
    `

    return super.render()
  }

  load () {
    this.arkMap.api.marker([2.44073, -76.602349]).addTo(this.arkMap.map)

    return super.load()
  }

  /** @returns {Map} */
  get arkMap () {
    return /** @type {Map} */ (this.select('ark-map'))
  }

  get token () {
    return 'pk' +
      '.eyJ1IjoiaXRudWJhcmsiLCJhIjoiY2pzdWsyYXo0MmY4dTQzcnI0Y2ZxMGt3aCJ9' +
      '.DPOHXK2aObjNChVAZ4_CMQ'
  }

  // ---------------------------------------------------------------------------
  getStyle () {
    return /* html */`
      <style>
        .map-container{
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        ark-map{
          height: 90%;
          width: 90%;
        }
      </style>
    `
  }
}
customElements.define('demo-map', MapDemo)
