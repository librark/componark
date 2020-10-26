import { Component } from '../../component'
import WebDataRocks from 'webdatarocks'

export class Pivot extends Component {
  init (context = {}) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */`
      <h1>Pivot</h1>

      <div id="wdr-component"></div>
    `


    var pivot = new WebDataRocks({
      container: "#wdr-component",
      toolbar: true,
      report: {
        dataSource: {
          filename: "https://cdn.webdatarocks.com/data/data.csv"
        }
      }
    })

    return super.render()
  }
}
customElements.define('ark-pivot', Pivot)
