import { Component } from '../../../base/component'

export class Camera extends Component {
  init (context = {}) {
    this.width = this.width || context.width || 320
    this.height = this.height || context.height || 320
    this.facingMode = this.facingMode || context.facingMode || 'user'
    this.navigatorObject = navigator

    return super.init()
  }

  reflectedProperties () {
    return ['width', 'height', 'facingMode']
  }

  render () {
    this.innerHTML = /* html */`
      <canvas data-canvas></canvas>
      <video data-video playsinline autoplay></video>
    `
    return super.render()
  }

  async load () {
    this.video.addEventListener('canplay', _ => {
      this.video.setAttribute('width', `${this.width}px`)
      this.video.setAttribute('height', `${this.height}px`)
      this.canvas.setAttribute('width', `${this.width}px`)
      this.canvas.setAttribute('height', `${this.height}px`)
    }, false)
  }

  /** @returns {string} */
  dataURL (width = this.width, height = this.height) {
    /** @type {HTMLCanvasElement} */
    const dupCanvas = (this.canvas.cloneNode(true))

    dupCanvas.width = this.width
    dupCanvas.height = this.height
    dupCanvas.getContext('2d').drawImage(
      this.video,
      0, 0, this.width, this.height,
      0, 0, width, height
    )

    return dupCanvas.toDataURL('image/jpg')
  }

  start () {
    // @ts-ignore
    this.navigatorObject.getMedia = this.navigatorObject.getUserMedia

    if (!this.navigatorObject.mediaDevices.getUserMedia) return

    this.navigatorObject.mediaDevices.getUserMedia({
      video: {
        width: this.width,
        height: this.height,
        facingMode: this.facingMode
      },
      audio: false
    }).then(stream => {
      this.video.srcObject = stream
    }).catch(e => console.error(e))
  }

  stop () {
    // @ts-ignore
    const tracks = this.video.srcObject ? this.video.srcObject.getTracks() : []
    tracks.forEach(track => track.stop())
  }

  setCameraOrientation (facingMode) {
    this.stop()
    this.facingMode = facingMode
    this.stop()
  }

  /** @returns {HTMLVideoElement} */
  get video () {
    return this.querySelector('[data-video]')
  }

  /** @returns {HTMLCanvasElement} */
  get canvas () {
    return this.querySelector('[data-canvas]')
  }
}
Component.define('ark-camera', Camera)
