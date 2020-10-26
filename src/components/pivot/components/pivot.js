import { Component } from '../../component'

export class Pivot extends Component {
  init (context = {}) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */`
      <h1>Pivot</h1>
    `
    return super.render()
  }
}
customElements.define('ark-pivot', Pivot)
