import { Component } from '../../component'

export class Treetable extends Component {
  init (context = {}) {
    this.data = context['data']
    this.headers = context['headers']

    // this.headers = [
    //   { header: 'Name', key: 'expander' },
    //   { header: 'Balance', key: 'balance' },
    //   { header: 'Balance Init', key: 'balance_init' },
    //   { header: 'Credit', key: 'credit' },
    //   { header: 'Debit', key: 'debit' },
    // ]

    this.rows = "children"
    this.cols = "values"

    return super.init()
  }

  render () {
    if (!this.data) return

    this.innerHTML = /* html */`
      <h1>Treetable</h1>

      <table>
        <thead data-thead class="treetable-thead">
          ${this.getHeader()}
        </thead>
        <tbody data-tbody class="treetable-tbody"></tbody>
      </table>
    `

    this.mainRows(this.data)

    return super.render()
  }

  /** @param {Object} data */
  mainRows (data, indent = -1) {
    if (!data) return
    indent++

    Object.keys(data).forEach(key => {
      const current = data[key]
      const rows = current[this.rows]
      const cols = current[this.cols]

      this.appendItem(key, indent, cols)

      this.mainRows(rows, indent)
    })
  }

  appendItem (key, indent, cols) {
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

  /** @returns {string} */
  getHeader () {
    let headers = ''

    this.headers.forEach(header => {
      headers += /* html */`
        <th>${header.header}</th>
      `
    })

    return /* html */ `<tr>${headers}</tr>`
  }

  /** @returns {HTMLElement} */
  get tablaBody () {
    return this.querySelector('[data-tbody]')
  }

  /** @returns {HTMLElement} */
  get tablaHead () {
    return this.querySelector('[data-thead]')
  }

}
customElements.define('ark-treetable', Treetable)
