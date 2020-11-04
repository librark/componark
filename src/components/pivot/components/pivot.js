import { Component } from '../../component'
import WebDataRocks from 'webdatarocks'

export class Pivot extends Component {
  /**
   * @param {{
   *  dataSource?: object
   *  options?: object
   * }} [context]
   **/
  init (context = {}) {
    this.dataSource = context.dataSource || {}
    this.options = context.options || {}
    return super.init()
  }

  render () {
    this.innerHTML = /* html */`
      <div class="ark-pivot--container">
        <div id="wdr-component"></div>
      </div>
    `
    this.renderPivot()
    return super.render()
  }

  renderPivot () {
    const container = this.pivotContainer.querySelector(`#wdr-component`)

    this.pivot = new WebDataRocks({
      container,
      toolbar: true,
      report: {
        dataSource: this.dataSource,
        options: this.options
      },
      global: {
        localization: "https://cdn.webdatarocks.com/loc/es.json"
      }
    })
  }

  get pivotContainer () {
    return /** @type {HTMLDivElement} */ (
      this.querySelector(`.ark-pivot--container`)
    )
  }
}
customElements.define('ark-pivot', Pivot)
