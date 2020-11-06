import Tabulator from 'tabulator-tables'
import { Component } from '../../component'

export class TabulatorTable extends Component {
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
      <div class="ark-tabulator--container">
        <div id="tabulator-table"></div>
      </div>
    `
    this.renderTabulatorTable()
    return super.render()
  }

  renderTabulatorTable () {
    const content = this.querySelector("#tabulator-table")

    var tabledata = [
      { id: 1, name: "Billy Bob", age: 12, gender: "male", height: 95, col: "red", dob: "14/05/2010" },
      { id: 2, name: "Jenny Jane", age: 42, gender: "female", height: 142, col: "blue", dob: "30/07/1954" },
      { id: 3, name: "Steve McAlistaire", age: 35, gender: "male", height: 176, col: "green", dob: "04/11/1982" },
    ]

    this.table = new Tabulator(content, {
      data: tabledata,
      autoColumns: true,
    })
  }
}
customElements.define('ark-tabulator', TabulatorTable)
