import { Component } from '../../component'

export class Location extends Component {
  init() {
    return super.init()
  }

  render() {
    this.innerHTML = "[[[[location]]]]"

    return super.render()
  }

  load() {
    return super.load()
  }
}
customElements.define('ark-location', Location)
