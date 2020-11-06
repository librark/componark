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
    this.renderTabulator()
    return super.render()
  }

  renderTabulator () {
    const data = [
      { id: 1, name: "Billy Bob", age: 12, gender: "male", height: 95, col: "red", dob: "14/05/2010" },
      { id: 2, name: "Jenny Jane", age: 42, gender: "female", height: 142, col: "blue", dob: "30/07/1954" },
      { id: 3, name: "Steve McAlistaire", age: 35, gender: "male", height: 176, col: "green", dob: "04/11/1982" },
    ]
    this.tabulator.init({
      data,
      autoColumns: true,
    }).render()
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
