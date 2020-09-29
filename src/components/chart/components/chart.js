import { Chart as ChartJs } from 'chart.js'
import { Component } from 'components/component'

export class Chart extends Component {
  init (context = {}) {
    this.details = context.details
    this.global = context.global || window

    return super.init()
  }

  connectedCallback () {
    super.connectedCallback()
    this.global.addEventListener('resize', this._resizeCanvas.bind(this))
  }

  disconnectedCallback () {
    this.global.removeEventListener('resize', this._resizeCanvas.bind(this))
  }

  render () {
    this.innerHTML = this._containsData()
      ? /* html */ `
      <canvas data-chart listen>
        Your browser does not support the canvas element.
      </canvas>
    `
      : ''
    this._renderChart()

    return super.render()
  }

  /**
   * @param {number} sizePalette
   * @param {string?} paletteName
   * @returns {{backgroundColor: Array, borderColor: Array }}
   * */
  generateColors (sizePalette, paletteName = 'mpn65') {
    const palette = require('google-palette/palette')
    const colors = palette('mpn65', sizePalette)

    const backgroundColor = []
    const borderColor = []

    colors.forEach(color => {
      backgroundColor.push(this._hexToRgba(color, 0.3))
      borderColor.push(this._hexToRgba(color))
    })

    return { backgroundColor: backgroundColor, borderColor: borderColor }
  }

  /** @return {ChartJs} */
  get chart () {
    return this._chart || null
  }

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

  /** @param {string} hex @param {number} alpha @returns {string} */
  _hexToRgba (hex, alpha = 1) {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16))
    return `rgba(${r},${g},${b},${alpha})`
  }
}
customElements.define('ark-chart', Chart)
