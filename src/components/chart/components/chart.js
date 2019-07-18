import { Component } from '../../component'
import { Chart as ChartJs } from 'chart.js'

export class Chart extends Component {
  init (context) {
    this.details = context['details']

    return super.init()
  }

  connectedCallback () {
    super.connectedCallback()
    window.addEventListener('resize', this._resizeCanvas.bind(this))
  }

  disconnectedCallback () {
    window.removeEventListener('resize', this._resizeCanvas.bind(this))
  }

  render () {
    this.innerHTML = this._containsData() ? /* html */`
      <canvas data-chart listen>
        Your browser does not support the canvas element.
      </canvas>
    ` : ''
    this._renderChart()

    return super.render()
  }

  /** @return {ChartJs} */
  get chart () {
    return this._chart || null
  }

  // ------------------------------------------------------------------------
  _containsData () {
    return Boolean(this.details && Object.keys(this.details).length)
  }

  _renderChart () {
    if (this._containsData()) {
      const element = this.querySelector('[data-chart]')
      this._chart = new ChartJs(element, this.details)
    }
  }

  _resizeCanvas () {
    if (this._containsData()) {
      for (var id in ChartJs.instances) {
        ChartJs.instances[id].resize()
      }
    }
  }
}
customElements.define('ark-chart', Chart)
