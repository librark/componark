import { Component } from '../../component'

export class GridItem extends Component {
  init (context) {
    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    // this.innerHTML = /* html */ `${this.innerHTML}`
    this.elementStyle()
  }

  elementStyle () {
    this.style.gridRowStart = `${this.rows} span`
    this.style.gridColumnStart = `${this.cols} span`
  }

  // ---------------------------------------------------------------------
  get rows () {
    return this.getAttribute('rows') || 1
  }

  get cols () {
    return this.getAttribute('cols') || 1
  }
}
customElements.define('ark-grid-item', GridItem)
