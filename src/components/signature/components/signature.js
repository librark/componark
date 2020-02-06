import { Component } from '../../component'

export class Signature extends Component {
  init() {
    return super.init()
  }

  render() {
    this.innerHTML = /* html */`
      <canvas id="signature-pad" class="signature-pad" width=400 height=200></canvas>
    `
    return super.render()
  }

  load() {
    return super.load()
  }
}
customElements.define('ark-signature', Signature)
