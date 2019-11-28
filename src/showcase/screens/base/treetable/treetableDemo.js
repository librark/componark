/**
 * @typedef {import('../../loader').Treetable} Treetable
 **/
import { Component } from '../../loader'

export class TreetableDemo extends Component {
  init (context) {
    this.type = context['type'] || 'ark'
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */`
      <div>
        <ark-Treetable></ark-Treetable>
      </div>
    `

    return super.render()
  }
}
customElements.define('demo-treetable', TreetableDemo)
