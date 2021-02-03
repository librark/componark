import { Component } from '../../../base/component'
import { styles } from '../styles'

const tag = 'ark-camera'
export class Camera extends Component {
  init (context = {}) {
    this.width = this.width || context.width || 320
    this.height = this.height || context.height || 320
    this.facingMode = this.facingMode || context.facingMode || 'user'
    this.global = context.global || window

    return super.init()
  }

  reflectedProperties () {
    return ['width', 'height', 'facingMode']
  }

  render () {
    this.content = /* html */`
      <canvas class="ark-camera__canvas"></canvas>
      <video class="ark-camera__video" playsinline autoplay></video>
    `

    this.video.addEventListener('canplay', _ => {
      this.video.setAttribute('width', `${this.width}px`)
      this.video.setAttribute('height', `${this.height}px`)
      this.canvas.setAttribute('width', `${this.width}px`)
      this.canvas.setAttribute('height', `${this.height}px`)
    }, false)

    return super.render()
  }

  /** @returns {string} */
  dataURL (width = null, height = null) {
    /** @type {HTMLCanvasElement} */
    const canvas = (this.canvas.cloneNode(true))

    canvas.width = width || this.width
    canvas.height = height || this.height
    canvas.getContext('2d').drawImage(
      this.video,
      0, 0, this.width, this.height,
      0, 0, width, height)

    return canvas.toDataURL('image/jpg')
  }

  async start () {
    const stream = await this.global.navigator.mediaDevices.getUserMedia({
      video: {
        width: this.width,
        height: this.height,
        facingMode: this.facingMode
      },
      audio: false
    })

    this.video.srcObject = stream
  }

  stop () {
    // @ts-ignore
    const tracks = this.video.srcObject ? this.video.srcObject.getTracks() : []
    tracks.forEach(track => track.stop())
  }

  async setCameraOrientation (facingMode) {
    this.stop()
    this.facingMode = facingMode
    await this.start()
  }

  /** @returns {HTMLVideoElement} */
  get video () {
    return this.querySelector('.ark-camera__video')
  }

  /** @returns {HTMLCanvasElement} */
  get canvas () {
    return this.querySelector('.ark-camera__canvas')
  }
}
Component.define(tag, Camera, styles)
