import { Component } from '../../component'
import SignaturePad from 'signature_pad/dist/signature_pad'

export class Signature extends Component {
  init(context = {}) {
    this.width = this.width || context['width'] || 400
    this.height = this.height || context['height'] || 300

    // -------------------------------------------------------------------------
    // Local
    // -------------------------------------------------------------------------
    this.global = context['global'] || window
    this._dirty = false

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
        class="ark-signature--pad">
      </canvas>
    `

    this.signaturePad = new SignaturePad(this.canvas, {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      penColor: 'rgb(0, 0, 0)',
    })

    return super.render()
  }

  load() {
    this.global.addEventListener("resize", this.resizeCanvas.bind(this))
    this.canvas.addEventListener("mousedown", _ => {
      this._dirty = true
      this.dispatchDirtyEvent()
    })

    setTimeout(_ => { this.resizeCanvas() }, 800)
    return super.load()
  }

  disconnectedCallback() {
    this.global.removeEventListener("resize", this.resizeCanvas.bind(this))
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
      0, 0, width, height,
      0, 0, this.canvas.width, this.canvas.height
    )

    return dupCanvas.toDataURL('image/jpg')
  }

  clear() {
    this.signaturePad.clear()
    this._dirty = false
    this.dispatchDirtyEvent()
  }

  resizeCanvas() {
    const ratio = Math.max(this.global.devicePixelRatio || 1, 1)
    this.width = this.canvas.width = this.offsetWidth * ratio
    this.height = this.canvas.height = this.offsetHeight * ratio
    this.canvas.getContext("2d").scale(ratio, ratio)
    this.clear()
  }

  // ---------------------------------------------------------------------------
  /** @returns {boolean} */
  get dirty() {
    return this._dirty
  }

  dispatchDirtyEvent() {
    this.dispatchEvent(
      new CustomEvent('signature:dirty', {
        bubbles: true,
        detail: {
          dirty: this.dirty
        }
      })
    )
  }

  /** @returns {HTMLCanvasElement} */
  get canvas() {
    return this.querySelector("[data-signature-pad]")
  }
}
customElements.define('ark-signature', Signature)
