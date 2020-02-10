import { Component } from '../../loader'

export class CameraDemo extends Component {
	init (context) {
		return super.init(context)
	}

	render () {
		this.innerHTML = /* html */ `${this.styles}
      <ark-Camera></ark-Camera>
      <button listen on-click="takepicture">Take photo</button>
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
      </style>
    `
	}
}
customElements.define('demo-camera', CameraDemo)
