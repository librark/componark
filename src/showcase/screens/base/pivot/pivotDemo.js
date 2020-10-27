/**
 * @typedef {import('../../loader').Pivot} Pivot
 **/
import { Component } from '../../loader'

export class PivotDemo extends Component {
  init (context) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `${this.styles}
      <h1>Pivot</h1>

      <div class="demo-pivot--content">
        <ark-pivot></ark-pivot>
      </div>
    `

    this.pivot.init({
      dataSource: {
        filename: "https://cdn.webdatarocks.com/data/data.csv"
      }
    }).render()

    return super.render()
  }

  get pivot () {
    return /** @type {Pivot} */(this.select('ark-pivot'))
  }

  get styles () {
    return /* html */ `
      <style>
        demo-pivot .demo-pivot--content{
          display: flex;
          padding: .5rem;
        }

      </style>
    `
  }
}
customElements.define('demo-pivot', PivotDemo)
