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
    this.innerHTML = /* html */`
      <table>
        ${this._renderHeaders()}
        ${this._renderData()}
      </table>
    `
  }

  _renderHeaders () {
    var aux = ''

    if (this._getPosition()) {
      aux += /* html */ `<th>No.</th>`
    }

    Object.keys(this.headers).forEach(key => {
      aux += /* html */ `<th>${this.headers[key]}</th>`
    })

    return aux ? /* html */ `<tr>${aux}</tr>` : ''
  }

  _renderData () {
    var aux = ''

    this.data.forEach((d, index) => {
      var td = ''

      if (this._getPosition()) {
        td += /* html */ `<td>${index + 1}</td>`
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
