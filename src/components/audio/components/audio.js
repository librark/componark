import { Component } from '../../component'
import { getSlots } from '../../../utils'

export class Audio extends Component {
  init(context = {}) {
    // -------------------------------------------------------------------------
    // local variables
    // -------------------------------------------------------------------------
    this.interval
    this.slots = this.slots || getSlots(this)

    return super.init()
  }

  reflectedProperties() {
    return ['toggle']
  }

  render() {
    this.innerHTML = /* html */`
      <div class="ark-audio__recording-time">
        ${this._getSlots('microphone')}
        <label data-recording-time></label>
      </div>

      ${
      this.isToggle() ?
        this._toggleTemplate() :
        this._individualButtonsTemplate()
      }
    `

    return super.render()
  }

  load() {
    return super.load()
  }

  // ---------------------------------------------------------------------------

  start() {
    this.stop()
    this._initInterval()
    this._changeIcons('start')
  }

  stop() {
    clearInterval(this.interval)
    this._changeIcons('stop')
  }

  // ---------------------------------------------------------------------------

  /** @returns {string} */
  _toggleTemplate() {
    return /* html */`
      <button data-toggle-button listen on-mousedown="start" on-mouseup="stop">
        <div data-toggle-icon-start>${this._getSlots('start')}</div>
        <div data-toggle-icon-stop>${this._getSlots('stop')}</div>
      </button>
    `
  }

  /** @returns {string} */
  _individualButtonsTemplate() {
    return /* html */`
      <div>
        <button data-toggle-button listen on-click="start">
          ${this._getSlots('start')}
        </button>
        <button data-toggle-button listen on-click="stop">
          ${this._getSlots('stop')}
        </button>
      </div>
    `
  }


  /** @returns {Boolean} */
  isToggle() {
    return this.hasAttribute('toggle')
  }

  _initInterval() {
    let totalSeconds = 0
    this._setRecordingTimeLabel()

    this.interval = setInterval(_ => {
      totalSeconds++

      const hours = Math.trunc(totalSeconds / 3600)
      const minutes = Math.trunc((totalSeconds - hours * 3600) / 60)
      const seconds = totalSeconds - minutes * 60 - hours * 3600

      this._setRecordingTimeLabel(hours, minutes, seconds)
    }, 1000)
  }

  // ---------------------------------------------------------------------------
  _setRecordingTimeLabel(hours = 0, minutes = 0, seconds = 0) {
    let timeLabel = ''

    timeLabel += hours < 10 ? `0${hours}` : hours
    timeLabel += ':'
    timeLabel += minutes < 10 ? `0${minutes}` : minutes
    timeLabel += ':'
    timeLabel += seconds < 10 ? `0${seconds}` : seconds

    this.recordingTimeLabel.innerText = timeLabel
  }

  _changeIcons(type) {
    /** @type {HTMLDivElement} */
    const iconStart = this.querySelector('[data-toggle-icon-start]')

    /** @type {HTMLDivElement} */
    const iconStop = this.querySelector('[data-toggle-icon-stop]')

    if (!iconStart || !iconStop) return

    if (type === 'start') {
      iconStart.style.display = 'none'
      iconStop.style.display = 'block'
    } else {
      iconStart.style.display = 'block'
      iconStop.style.display = 'none'
    }
  }

  _getSlots(key) {
    if (!this.slots || !this.slots[key]) return ''

    return /* html */ `
        ${this.slots[key].map(element => `${element.outerHTML}`).join('')}
      `.trim()
  }

  // ---------------------------------------------------------------------------

  /** @returns {HTMLLabelElement} */
  get recordingTimeLabel() {
    return this.querySelector('[data-recording-time]')
  }

  /** @returns {HTMLButtonElement} */
  get toggleButton() {
    return this.querySelector('[data-toggle-button]')
  }
}
customElements.define('ark-audio', Audio)
