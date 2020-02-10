import { Component } from '../../component'

export class Camera extends Component {
  init(context = {}) {
    this.width = this.width || context['width'] || 320
    this.height = this.height || context['height'] || 320

    return super.init()
  }

  reflectedProperties() {
    return ['width', 'height']
  }

  render() {
    this.innerHTML = /* html */`
      <canvas data-canvas></canvas>
      <video data-video playsinline autoplay></video>
    `
    return super.render()
  }

  load() {
    this.video.addEventListener('canplay', _ => {
      this.video.setAttribute('width', `${this.width}px`)
      this.video.setAttribute('height', `${this.height}px`)
      this.canvas.setAttribute('width', `${this.width}px`)
      this.canvas.setAttribute('height', `${this.height}px`)
    }, false)

    return super.load()
  }

  // ---------------------------------------------------------------------------

  /** @returns {string} */
  get dataURL() {
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.getContext('2d').drawImage(
      this.video, 0, 0, this.width, this.height
    )
    return this.canvas.toDataURL('image/jpg')
  }

  // ---------------------------------------------------------------------------

  start() {
    navigator.getMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    )

    navigator.mediaDevices.getUserMedia({
      video: {
        width: this.width,
        height: this.height
      },
      audio: false
    }).then(stream => {
      this.video.srcObject = stream
    }).catch(e => console.error(e))
  }

  stop() {
    // @ts-ignore
    const tracks = this.video.srcObject ? this.video.srcObject.getTracks() : []
    tracks.forEach(track => track.stop())
  }

  // ---------------------------------------------------------------------------

  /** @returns {HTMLVideoElement} */
  get video() {
    return this.querySelector('[data-video]')
  }

  /** @returns {HTMLCanvasElement} */
  get canvas() {
    return this.querySelector('[data-canvas]')
  }
}
customElements.define('ark-camera', Camera)
