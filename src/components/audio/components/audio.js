import { Component } from '../../component'
import { getSlots } from '../../../utils'

export class Audio extends Component {
	init (context = {}) {
		// local variables
		this.interval = null
		this.totalSeconds = 0
		this.slots = this.slots || getSlots(this)
		this.stream = null
		this.global = context.global || window

		return super.init()
	}

	render () {
		this.innerHTML = /* html */`
      <div class="ark-audio__recording-time">
        ${this._getSlots('microphone')}
        <label data-recording-time></label>
      </div>

      <div class="ark-audio--buttons">
        <button class="ark-audio--button-start" listen on-click="start">
          ${this._getSlots('start')}
        </button>
        <button class="ark-audio--button-stop" listen on-click="stop">
          ${this._getSlots('stop')}
        </button>
      </div>
    `

		return super.render()
	}

	load () {	}

	disconnectedCallback () {
		this.stop()
	}

	start () {
		this.stop()

		// @ts-ignore
		navigator.getMedia = navigator.getUserMedia

		if (!navigator.mediaDevices.getUserMedia) return

		navigator.mediaDevices.getUserMedia({
			audio: true
		}).then(stream => {
			this.stream = stream
			// @ts-ignore
			this.mediaRecorder = new MediaRecorder(this.stream)

			this.mediaRecorder.ondataavailable = event => {
				this._setAudioURL(event.data)
			}

			this.mediaRecorder.onstop = _ => this._changeStyle('stop')

			this.mediaRecorder.onstart = _ => {
				this._initInterval()
				this._changeStyle('start')
			}

			this.mediaRecorder.start()
		}).catch(e => console.error(e))
	}

	stop () {
		this.global.clearInterval(this.interval)
		this.interval = null

		if (!this.mediaRecorder) return

		const tracks = this.stream ? this.stream.getTracks() : []
		tracks.forEach(track => track.stop())
		this.mediaRecorder.stop()
		this.mediaRecorder = null
		this.stream = null

		this._onStopEvent()
	}

	dataURL () {
		return this.audioURL
	}

	_setAudioURL (blob) {
		const reader = new FileReader()
		reader.readAsDataURL(blob)
		reader.onloadend = () => {
			this.audioURL = reader.result

			this.dispatchEvent(new CustomEvent('onStopAudio', {
				bubbles: true,
				detail: {
					dataURL: this.audioURL,
					origin: event
				}
			}))
		}
	}

	_initInterval () {
		this.totalSeconds = 0
		this._setRecordingTimeLabel()

		this.interval = setInterval(_ => {
			this.totalSeconds++
			this._onStartEvent()

			const hours = Math.trunc(this.totalSeconds / 3600)
			const minutes = Math.trunc((this.totalSeconds - hours * 3600) / 60)
			const seconds = this.totalSeconds - minutes * 60 - hours * 3600

			this._setRecordingTimeLabel(hours, minutes, seconds)
		}, 1000)
	}

	_onStartEvent () {
		this.dispatchEvent(new CustomEvent('onStartAudio', {
			bubbles: true,
			detail: {
				totalSeconds: this.totalSeconds
			}
		}))
	}

	_onStopEvent () {
		this.dispatchEvent(new CustomEvent('onStopAudio', {
			bubbles: true,
			detail: {
				totalSeconds: this.totalSeconds
			}
		}))
	}

	_setRecordingTimeLabel (hours = 0, minutes = 0, seconds = 0) {
		let timeLabel = ''

		// timeLabel += hours < 10 ? `0${hours}` : hours
		// timeLabel += ':'
		timeLabel += minutes < 10 ? `0${minutes}` : minutes
		timeLabel += ':'
		timeLabel += seconds < 10 ? `0${seconds}` : seconds

		this.recordingTimeLabel.innerText = timeLabel
	}

	_changeStyle (type) {
		/** @type {HTMLDivElement} */
		const iconStart = this.querySelector('[data-toggle-icon-start]')

		/** @type {HTMLDivElement} */
		const iconStop = this.querySelector('[data-toggle-icon-stop]')

		if (type === 'start') {
			this.classList.add('ark-audio--play')
		} else {
			this.classList.remove('ark-audio--play')
		}

		if (!iconStart || !iconStop) return

		if (type === 'start') {
			iconStart.style.display = 'none'
			iconStop.style.display = 'block'
		} else {
			iconStart.style.display = 'block'
			iconStop.style.display = 'none'
		}
	}

	_getSlots (key) {
		if (!this.slots || !this.slots[key]) return ''

		return /* html */ `
        ${this.slots[key].map(element => `${element.outerHTML}`).join('')}
      `.trim()
	}

	/** @returns {HTMLLabelElement} */
	get recordingTimeLabel () {
		return this.querySelector('[data-recording-time]')
	}
}
customElements.define('ark-audio', Audio)
