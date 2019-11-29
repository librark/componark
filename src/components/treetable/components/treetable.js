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
  buildTable (data, indent = -1) {
    if (!data) return
    indent++

    Object.keys(data).forEach(key => {
      const current = data[key]
      const rows = current[this.rows]
      const cols = current[this.cols]

      this.addRow(key, indent, cols)

      this.buildTable(rows, indent)
    })
  }

  addRow (key, indent, cols) {
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
      <tr tabindex="0" >${cells}</tr>
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
