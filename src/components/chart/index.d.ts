import { Component } from "../component";
import { Chart as ChartJs } from 'chart.js'

export class Chart extends Component {
  chart: ChartJs

  generateColors(sizePalette: number, paletteName?: string): {
    backgroundColor: [], borderColor: []
  }
}