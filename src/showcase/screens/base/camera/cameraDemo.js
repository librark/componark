import { Component } from 'base/component'

export class CameraDemo extends Component {
  render () {
    this.innerHTML = /* html */ `${this.styles}
      <div class="camera-container">
        <ark-camera></ark-camera>
        <ark-button listen on-click="takepicture">Take photo</ark-button>
        <ark-button listen on-click="startCamera">Start</ark-button>
        <ark-button listen on-click="stopCamera">stop</ark-button>
      </div>

      <img data-photo>
    `

    this.camera['start']()

    return super.render()
  }

  disconnectedCallback () {
    this.camera['stop']()
  }

  takepicture () {
    this.photo.setAttribute('src', this.camera['dataURL'](200, 200))
  }

  startCamera () {
    this.camera['start']()
  }

  stopCamera () {
    this.camera['stop']()
  }

  get camera () {
    return this.select('ark-camera')
  }

  /** @returns {HTMLImageElement} */
  get photo () {
    return this.querySelector('[data-photo]')
  }

  get styles () {
    return /* html */ `
      <style>
        demo-camera{
          display: flex;
          flex-direction: column;
        }

        ark-camera, img{
          border-radius: 5px;
        }

        .camera-container{
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 1rem;
          width: 100%;
        }
      </style>
    `
  }
}
Component.define('demo-camera', CameraDemo)
