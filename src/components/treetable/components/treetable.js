import { Component } from '../../component'

export class Treetable extends Component {
  init (context = {}) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */`
      <h1>Treetable</h1>
    `
    return super.render()
  }

  load () {
    return super.load()
  }
}
customElements.define('ark-treetable', Treetable)
