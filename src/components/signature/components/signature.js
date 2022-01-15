import { Component } from '../../../base/component/index.js'
import SignaturePad from 'signature_pad'
import { styles } from '../styles/index.js'


const tag = 'ark-signature'
export class Signature extends Component {
  init (context = {}) {
    this.width = this.width || context.width
    this.height = this.height || context.height

    this.global = context.global || window
    this.lib = context.lib || SignaturePad
    this._dirty = false

    return super.init()
  }

  reflectedProperties () {
    return ['width', 'height']
  }

  render () {
    this.content = /* html */`
      <canvas data-signature-pad class="ark-signature__pad"></canvas>
    `

    this.signaturePad = new this.lib(this.canvas, {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      penColor: 'rgb(0, 0, 0)'
    })

    if (this.width) this.style.width = this.width
    if (this.height) this.style.height = this.height

    this.canvas.addEventListener('touchend', _ => this.mark())
    this.canvas.addEventListener('mouseup', _ => this.mark())

    this.resizeCanvas()

    return super.render()
  }

  /** @returns {HTMLCanvasElement} */
  get canvas () {
    return this.querySelector('[data-signature-pad]')
  }

  /** @returns {string} */
  dataURL (width = null, height = null) {
    /** @type {HTMLCanvasElement} */
    const dupCanvas = (this.canvas.cloneNode(true))

    dupCanvas.width = width || this.width
    dupCanvas.height = height || this.height
    dupCanvas.getContext('2d').drawImage(
      this.canvas,
      0, 0, this.canvas.width, this.canvas.height,
      0, 0, width, height
    )

    return dupCanvas.toDataURL('image/jpg')
  }

  clear (dirty) {
    this.signaturePad.clear()
    this._dirty = dirty
    this.dispatchDirtyEvent()
  }

  mark () {
    this._dirty = true
    this.dispatchDirtyEvent()
  }

  resizeCanvas () {
    const ratio = Math.max(this.global.devicePixelRatio, 1)
    const width = this.offsetWidth * ratio
    const height = this.offsetHeight * ratio
    const dataURL = this.dataURL(width, height)

    this.canvas.width = width
    this.canvas.height = height
    this.canvas.getContext('2d').scale(ratio, ratio)
    this.clear(this.dirty)

    this.signaturePad.fromDataURL(dataURL)
  }

  /** @returns {boolean} */
  get dirty () {
    return this._dirty
  }

  dispatchDirtyEvent () {
    this.emit('signature:dirty', { dirty: this.dirty })
  }

}
Component.define(tag, Signature, styles)
