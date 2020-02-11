import { Component } from "../../loader"

export class LocationDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}
      location demo

      <ark-location></ark-location>
    `
    return super.render()
  }

  get styles() {
    return /* html */ `
      <style>
        demo-location{}
      </style>
    `
  }
}
customElements.define("demo-location", LocationDemo)
