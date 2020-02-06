import { Component } from "../../loader"

export class SignatureDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}
      <ark-signature></ark-signature>
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
customElements.define("demo-signature", SignatureDemo)
