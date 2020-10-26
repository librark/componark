/**
 * @typedef {import('../../../../components/pivot/components/pivot').Pivot} Pivot
  * */
import { Component } from '../../loader'

export class PivotDemo extends Component {
  init (context) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `${this.styles}
      <ark-pivot></ark-pivot>
    `
    return super.render()
  }

  get styles () {
    return /* html */ `
      <style>
        demo-pivot{ }

      </style>
    `
  }
}
customElements.define('demo-pivot', PivotDemo)
