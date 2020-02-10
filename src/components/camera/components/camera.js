import { Component } from '../../component'

export class Camera extends Component {
  init() {
    return super.init()
  }

  render() {
    this.innerHTML = /* html */`
      <video data-video playsinline autoplay></video>
      <canvas data-canvas></canvas>

      <button listen on-click="initWebcam">Take photo</button>
    `

    return super.render()
  }

  load() {
    return super.load()
  }

  // Access webcam
  initWebcam() {
    var constraints = { video: true, audio: true }

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => this.video.srcObject = stream)
      .catch(e => console.error(e))
  }

  /** @returns {HTMLVideoElement} */
  get video() {
    return this.querySelector('[data-video]')
  }

  /** @returns {HTMLVideoElement} */
  get canvas() {
    return this.querySelector('[data-canvas]')
  }
}
customElements.define('ark-camera', Camera)
