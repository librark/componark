import { Component } from '../../component'
import WebDataRocks from 'webdatarocks'
import { uuid } from '../../../utils'

export class Pivot extends Component {
  /**
   * @param {{
   *  dataSource: object
   * }} [context]
   **/
  init (context) {
    this.dataSource = context.dataSource || {}

    this.pivotId = uuid()
    this.pivot = this.pivot

    return super.init()
  }

  render () {
    this.innerHTML = /* html */`
      <div class="ark-pivot--container">
        <div id="${this.pivotId}"></div>
      </div>
    `
    this.renderPivot()
    return super.render()
  }

  renderPivot () {
    this.pivot = new WebDataRocks({
      container: `#${this.pivotId}`,
      toolbar: true,
      report: {
        dataSource: this.dataSource
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
