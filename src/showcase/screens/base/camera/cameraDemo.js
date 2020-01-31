import { Component } from "../../loader"

export class CameraDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}
      <ark-Camera></ark-Camera>
    `
    return super.render()
  }

  get styles() {
    return /* html */ `
      <style>
      </style>
    `
  }
}
customElements.define("demo-camera", CameraDemo)
