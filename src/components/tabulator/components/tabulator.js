import Tabulator from 'tabulator-tables'
import { Component } from '../../component'

export class TabulatorTable extends Component {
  /**
   * @param {{
   *  options?: object
   * }} [context]
   **/
  init (context = {}) {
    this.options = context || {}
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
    const element = this.querySelector("#tabulator-table")
    this.table = new Tabulator(element, this.options)
    this.table.redraw(true)
  }
}
customElements.define('ark-tabulator', TabulatorTable)
