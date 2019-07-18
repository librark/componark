import { Component } from '../components'
/** @typedef {import('../components').Chart} Chart */

export class ChartDemo extends Component {
  init (context) {
    this.type = context['type'] || 'ark'
    return super.init()
  }

  render () {
    this.innerHTML = /* html */`
    <!-- DOCUMENTATION -->
      <p>
        <a href="https://www.chartjs.org">ChartJs</a>
      </p>

      <div>
        <p>MOBILE (360px).</p>
        <hr align="left" width="360px"/>
      </div>

      <iframe data-mobile src="/${this.type}.html" frameborder="1"
      width="360px"></iframe>

      <div>
        <p>TABLET (768px).</p>
        <hr align="left" width="768px" />
      </div>

      <iframe data-tablet src="/${this.type}.html" frameborder="1"
      width="768px"></iframe>

      <div>
        <p>DESKTOP (960px).</p>
        <hr align="left" width="960px" />
      </div>

      <iframe data-desktop src="/${this.type}.html" frameborder="1"
      width="960px"></iframe>

      <div>
        <p>THIS DISPLAY.</p>
        <hr align="left" width="960px" />
      </div>

      <div data-display>
        ${this._setupContent()}
      </div>
    `

    return super.render()
  }

  load () {
    this._setup()
    return super.load()
  }

  _setup () {
    this._setupFrame('[data-mobile]')
    this._setupFrame('[data-tablet]')
    this._setupFrame('[data-desktop]')
    this._initElement(this)
  }

  _setupContent () {
    return /* html */`
        <p>This is a Chart.</p>
        <ark-chart data-chart-pie></ark-chart>
        <ark-chart data-chart-doughnut></ark-chart>
        <ark-chart data-chart-bar></ark-chart>
        <ark-chart data-chart-line></ark-chart>
        <ark-chart data-chart-radar></ark-chart>
    `
  }

  _setupFrame (frameName) {
    const content = this._setupContent()
    const frame = this.querySelector(frameName)
    frame.onload = () => {
      const frameBody = frame.contentDocument.querySelector('body')
      const app = frameBody.querySelector('app-showcase-ark')
      const main = document.createElement('main')
      main.innerHTML = content
      this._initElement(main)

      app.parentNode.removeChild(app)
      frameBody.prepend(main)
    }
  }

  _initElement (main) {
    const pie = (/** @type {Chart} */ (
      main.querySelector('[data-chart-pie]')))
    pie.init({ details: this._getDetailsPie() }).render()

    const doughnut = (/** @type {Chart} */ (
      main.querySelector('[data-chart-doughnut]')))
    doughnut.init({ details: this._getDetailsDoughnut() }).render()

    const bar = (/** @type {Chart} */ (
      main.querySelector('[data-chart-bar]')))
    bar.init({ details: this._getDetailsBar() }).render()

    const line = (/** @type {Chart} */ (
      main.querySelector('[data-chart-line]')))
    line.init({ details: this._getDetailsLine() }).render()

    const radar = (/** @type {Chart} */ (
      main.querySelector('[data-chart-radar]')))
    radar.init({ details: this._getDetailsRadar() }).render()
  }

  _getDetailsDoughnut () {
    return {
      type: 'doughnut',
      data: this._data()
    }
  }

  _getDetailsPie () {
    return {
      type: 'pie',
      data: this._data()
    }
  }

  _getDetailsRadar () {
    return {
      type: 'radar',
      data: this._data()
    }
  }

  _getDetailsLine () {
    return {
      type: 'line',
      data: this._data()
    }
  }

  _getDetailsBar () {
    return {
      type: 'bar',
      data: this._data()
    }
  }

  _data () {
    return {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
  }
}
customElements.define('demo-chart', ChartDemo)
