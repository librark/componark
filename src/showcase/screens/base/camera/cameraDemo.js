/** @typedef {import('components').Camera} Camera */
import { Component } from '../../loader'

export class CameraDemo extends Component {
	init (context) {
		return super.init(context)
	}

	render () {
		this.innerHTML = /* html */ `${this.styles}
      <div class="camera-container">
        <ark-Camera></ark-Camera>
        <ark-button listen on-click="takepicture">Take photo</ark-button>
        <ark-button listen on-click="startCamera">Start</ark-button>
        <ark-button listen on-click="stopCamera">stop</ark-button>
      </div>

      <img data-photo>
    `

		this.camera.start()

		return super.render()
	}

	disconnectedCallback () {
		this.camera.stop()
	}

	takepicture () {
		this.photo.setAttribute('src', this.camera.dataURL(200, 200))
	}

	startCamera () {
		this.camera.start()
	}

	stopCamera () {
		this.camera.stop()
	}

	/** @return {Camera} */
	get camera () {
		return /** @type {Camera} */ (this.select('ark-Camera'))
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

        ark-Camera, img{
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
customElements.define('demo-camera', CameraDemo)
