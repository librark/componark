import { Component } from '../../loader'

export class CameraDemo extends Component {
	init (context) {
		return super.init(context)
	}

	render () {
		this.innerHTML = /* html */ `${this.styles}
      <div class="camera-container">
        <ark-Camera></ark-Camera>
        <button listen on-click="takepicture">Take photo</button>
      </div>
      <img data-photo>
    `
		return super.render()
	}

	takepicture () {
		this.photo.setAttribute('src', this.camera.dataURL)
	}

	get camera () {
		return this.select('ark-Camera')
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
