import { Component } from '../../loader'
/**
 * @typedef {import('../../loader').Audio} Audio
 */

export class AudioDemo extends Component {
	init (context) {
		return super.init(context)
	}

	render () {
		this.innerHTML = /* html */ `${this.styles}
      <ark-Audio background="dark" color="danger" data-ark-audio>
        <ark-icon slot="microphone" name="fas fa-microphone"></ark-icon>
        <ark-icon slot="start" name="fas fa-play"></ark-icon>
        <ark-icon slot="stop" name="fas fa-stop"></ark-icon>
      </ark-Audio>

      <hr/>

      <ark-Audio toggle>
        <ark-icon slot="microphone" name="fas fa-microphone"></ark-icon>
        <ark-icon slot="start" name="fas fa-play"></ark-icon>
        <ark-icon slot="stop" name="fas fa-stop"></ark-icon>
      </ark-Audio>

      <audio data-audio controls></audio>
    `
		return super.render()
	}

	load () {
		this.addEventListener('onStopAudio', (
			/** @type {CustomEvent} */ event) => {
			event.stopImmediatePropagation()
			this.audio.src = event.detail.dataURL
		})

		this.addEventListener('onStartAudio', (
			/** @type {CustomEvent} */ event) => {
			event.stopImmediatePropagation()

			if (event.detail.totalSeconds >= 10) this.arkAudio.stop()
		})

		this.addEventListener('onStopAudio', (
			/** @type {CustomEvent} */ event) => {
			event.stopImmediatePropagation()
		})

		return super.load()
	}

	/** @returns {HTMLAudioElement} */
	get audio () {
		return this.querySelector('[data-audio]')
	}

	/** @returns {Audio} */
	get arkAudio () {
		return this.querySelector('[data-ark-audio]')
	}

	get styles () {
		return /* html */ `
      <style>
        demo-audio{
          padding: 1rem;
        }

        audio{
          margin: 1rem;
        }
      </style>
    `
	}
}
customElements.define('demo-audio', AudioDemo)
