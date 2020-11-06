/**
 * @typedef {import('../../loader').TabulatorTable} Tabulator
 **/
import { Component } from '../../loader'

export class TabulatorDemo extends Component {
  init (context) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `${this.styles}
      <h1>Tabulator</h1>

      <div class="demo-tabulator--content">
        <ark-tabulator></ark-tabulator>
      </div>
    `

    // this.tabulator.init({
    //   dataSource: {
    //     filename: "https://cdn.webdatarocks.com/data/data.csv"
    //   }
    // }).render()

    return super.render()
  }

  get tabulator () {
    return /** @type {Tabulator} */(this.select('ark-tabulator'))
  }

  get styles () {
    return /* html */ `
      <style>
        demo-tabulator .demo-tabulator--content{
          display: flex;
          padding: .5rem;
        }

      </style>
    `
  }
}
customElements.define('demo-tabulator', TabulatorDemo)
