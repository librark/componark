import ChartJs from 'chart.js/auto'
import { Component } from '../../../base/component'
import { styles } from '../styles'

const tag = 'ark-chart'
export class Chart extends Component {
  init (context = {}) {
    this.details = context.details || {}
    this.global = context.global || window
    this.lib = context.lib || ChartJs

    return super.init()
  }

  render () {
    this.content  = /* html */ `
      <canvas data-chart>
        Your browser does not support the canvas element.
      </canvas>
    `
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

  _renderChart () {
    if (Object.keys(this.details).length) {
      const element = this.querySelector('[data-chart]')
      this._chart = new this.lib(element, this.details)
    }
  }

  /** @param {string} hex @param {number} alpha @returns {string} */
  _hexToRgba (hex, alpha = 1) {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16))
    return `rgba(${r},${g},${b},${alpha})`
  }
}
Component.define(tag, Chart, styles)
