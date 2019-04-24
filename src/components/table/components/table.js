import { arrayExpression } from '@babel/types'

export class Table extends HTMLElement {
  init (context) {
    this.headers = context['headers']
    this.data = context['data']

    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this._getPosition()

    this.innerHTML = /* html */`
      <table>
        ${this._getHeaders()}
        ${this._getData()}
      </table>
    `
  }

  _getHeaders () {
    var aux = ''

    if (this._getPosition()) {
      aux += /* html */ `<th>No.</th>`
    }

    Object.keys(this.headers).forEach(key => {
      aux += /* html */ `<th>${this.headers[key]}</th>`
    })

    return aux ? /* html */ `<tr>${aux}</tr>` : ''
  }

  _getData () {
    var aux = ''

    this.data.forEach((d, index) => {
      var td = ''

      if (this._getPosition()) {
        td += /* html */ `<td>${index}</td>`
      }

      Object.keys(this.headers).forEach(key => {
        td += /* html */ `<td>${d[key] || ''}</td>`
      })

      aux += /* html */ `<tr>${td}</tr>`
    })

    return aux || ''
  }

  _getPosition () {
    const attributes = Array.from(this.attributes)
    return attributes.map(att => { return att.name }).indexOf('position') >= 0
  }

  // ---------------------------------------------------------
  // Get & Set
  // ---------------------------------------------------------

  get headers () {
    return this._headers || {}
  }

  set headers (value) {
    this._headers = value
  }

  get data () {
    return this._data || []
  }

  set data (value) {
    this._data = value
  }
}
customElements.define('ark-table', Table)
