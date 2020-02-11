import { Component } from '../../component'
import SignaturePad from 'signature_pad/dist/signature_pad'

export class Signature extends Component {
  init(context = {}) {
    this.width = this.width || context['width'] || 400
    this.height = this.height || context['height'] || 200

    return super.init()
  }

  reflectedProperties() {
    return ['width', 'height']
  }

  render() {
    this.innerHTML = /* html */`
      <canvas data-signature-pad
        width="${this.width}"
        height="${this.height}"
        class="ark-signature--pad"></canvas>
    `

    this.signaturePad = new SignaturePad(this.canvas, {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      penColor: 'rgb(0, 0, 0)',
    })

    return super.render()
  }

  // ---------------------------------------------------------------------------

  /** @returns {string} */
  dataURL(width = this.width, height = this.height) {
    /** @type {HTMLCanvasElement} */
    const dupCanvas = (this.canvas.cloneNode(true))

    dupCanvas.width = width
    dupCanvas.height = height
    dupCanvas.getContext('2d').drawImage(
      this.canvas,
      0, 0, this.width, this.height,
      0, 0, width, height
    )

    return dupCanvas.toDataURL('image/jpg')
  }

  clear() {
    this.signaturePad.clear()
  }

  // ---------------------------------------------------------------------------

  /** @returns {HTMLCanvasElement} */
  get canvas() {
    return this.querySelector("[data-signature-pad]")
  }
}
customElements.define('ark-signature', Signature)
