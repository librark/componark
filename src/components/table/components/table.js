import { Component } from '../../component'

export class Table extends Component {
  init (context) {
    this.headers = context['headers'] || this.headers || {}
    this.data = context['data'] || this.data || []

    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */`
      <table>
        ${this._renderHeaders()}
        ${this._renderData()}
      </table>
    `
    return super.render()
  }

  _renderHeaders () {
    var headers = ''

    if (this._getPosition()) headers += /* html */ `<th>No.</th>`

    Object.keys(this.headers).forEach(key => {
      headers += /* html */ `<th>${this.headers[key]}</th>`
    })

    return headers ? /* html */ `<tr>${headers}</tr>` : ''
  }

  _renderData () {
    var data = ''

    this.data.forEach((d, index) => {
      var td = ''

      if (this._getPosition()) td += /* html */ `<td>${index + 1}</td>`

      Object.keys(this.headers).forEach(key => {
        td += /* html */ `<td>${d[key] || ''}</td>`
      })

      data += /* html */ `<tr>${td}</tr>`
    })

    return data || ''
  }

  _getPosition () {
    const attributes = Array.from(this.attributes)
    return attributes.map(att => { return att.name }).indexOf('position') >= 0
  }
}
customElements.define('ark-table', Table)
