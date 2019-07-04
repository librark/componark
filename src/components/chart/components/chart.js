import { Component } from '../../component'
import { Chart as ChartJs } from 'chart.js'

export class Chart extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */`
      <h1>[[Chart]]</h1>
    `
    return super.render()
  }
}
customElements.define('ark-chart', Chart)
