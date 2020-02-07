import * as SignaturePad from 'signature_pad/dist/signature_pad'

import { Component } from '../../component'

export class Signature extends Component {
  init() {
    return super.init()
  }

  render() {
    this.innerHTML = /* html */`
      <canvas data-signature-pad class="ark-signature--pad"
        width=400 height=200></canvas>
    `

    this.signaturePad = new SignaturePad(this.canvas, {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      penColor: 'rgb(0, 0, 0)'
    })

    return super.render()
  }

  load() {
    return super.load()
  }

  /** @returns {HTMLElement} */
  get canvas() {
    return this.querySelector("[data-signature-pad]")
  }
}
customElements.define('ark-signature', Signature)
