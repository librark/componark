import { Component } from 'base/component'

const tag = 'demo-camera'
export class CameraDemo extends Component {
  render () {
    this.innerHTML = /* html */ `
      <div class="camera-container">
          <ark-camera></ark-camera>
          <div class="menu">
            <ark-button background="primary" listen on-click="takepicture">Take photo</ark-button>
            <ark-button background="success" listen on-click="startCamera">Start</ark-button>
            <ark-button background="danger"  color="dark" listen on-click="stopCamera">stop</ark-button>
          </div>
      </div>

      <img data-photo>

      <br>

      <a href="https://github.com/knowark/componark/blob/master/src/components/camera/README.rst">
      * Reference
      </a>
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

}

const styles = /* css */`

        demo-camera{
          display: flex;
          flex-direction: column;
        }

        ark-camera, img{
          border-radius: 5px;
        }

        .camera-container{
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 1rem;
          width: 100%;
        }

        .ark-button{
          margin:1rem 0.6rem;
        }

`
Component.define(tag, CameraDemo, styles)
