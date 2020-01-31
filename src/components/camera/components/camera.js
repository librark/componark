import { Component } from '../../component'

export class Camera extends Component {
  init() {
    return super.init()
  }

  render() {
    this.innerHTML = "[[[camera]]]"

    return super.render()
  }

  load() {
    return super.load()
  }
}
customElements.define('ark-camera', Camera)
