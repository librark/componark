import { Component } from '../../component'

export class Treetable extends Component {
  init (context = {}) {
    this.cols = context['cols']
    this.rows = context['rows']
    this.headers = context['headers']
    this.data = context['data']

    return super.init()
  }

  render () {
    if (!this.data) return

    this.innerHTML = /* html */`
      <h1>Treetable</h1>

      <table>
        <thead data-thead class="treetable-thead">
          ${this._getHeader()}
        </thead>
        <tbody data-tbody class="treetable-tbody"></tbody>
      </table>
    `

    this.buildTable(this.data)

    return super.render()
  }

  // ---------------------------------------------------------------------------

  /** @param {Object} data */
  buildTable (data, id = "", indent = -1) {
    if (!data) return
    indent++

    id = this._setRowId(id, indent)

    Object.keys(data).forEach(key => {
      const current = data[key]
      const rows = current[this.rows]
      const cols = current[this.cols]

      id = this._setRowId(id, indent)

      this.addRow(id, indent, key, cols)
      this.buildTable(rows, id, indent)
    })
  }

  addRow (id, indent, key, cols) {
    indent = indent <= 1 ? 0 : indent - 1

    let cells = ''

    this.headers.forEach(header => {
      if (header.key === 'expander') {
        cells += /* html */`
          <td style="padding-left: ${indent}rem">${key}</td>
        `
      } else {
        cells += /* html */`
          <td>${cols[header.key]}</td>
        `
      }
    })

    this.tablaBody.insertAdjacentHTML('beforeend', /* html */`
      <tr id="${id}" tabindex="0" >${cells}</tr>
    `)
  }

  /** @returns {HTMLElement} */
  get tablaBody () {
    return this.querySelector('[data-tbody]')
  }

  /** @returns {HTMLElement} */
  get tablaHead () {
    return this.querySelector('[data-thead]')
  }

  // ---------------------------------------------------------------------------
  /**
   * @param {string} id
   * @param {number} indent
   */
  _setRowId (id, indent) {
    let currentId = ""
    id.split('.').forEach((n, index) => {
      const item = indent === index ? parseInt(n) + 1 || 0 : n
      currentId += item !== '' ? `${item}.` : ''
    })

    return currentId
  }

  /** @returns {string} */
  _getHeader () {
    let headers = ''

    this.headers.forEach(header => {
      headers += /* html */`
        <th>${header.header}</th>
      `
    })

    return /* html */ `<tr>${headers}</tr>`
  }

}
customElements.define('ark-treetable', Treetable)
