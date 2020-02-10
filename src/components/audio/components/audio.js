import { Component } from '../../component'

export class Audio extends Component {
  init(context = {}) {
    // -------------------------------------------------------------------------
    this.interval

    return super.init()
  }

  reflectedProperties() {
    return ['toggle']
  }

  render() {
    this.innerHTML = /* html */`
      <label data-recording-time></label>
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
  }

  stop() {
    clearInterval(this.interval)
  }

  // ---------------------------------------------------------------------------

  /** @returns {string} */
  _toggleTemplate() {
    return /* html */`
      <button data-toggle-button listen on-mousedown="start" on-mouseup="stop">
        btn
      </button>
    `
  }

  /** @returns {string} */
  _individualButtonsTemplate() {
    return /* html */`
      <div>
        <button data-toggle-button listen on-click="start">
          start
        </button>
        <button data-toggle-button listen on-click="stop">
          stop
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
