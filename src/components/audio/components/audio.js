import { Component } from '../../component'

export class Audio extends Component {
  init(context = {}) {
    // -------------------------------------------------------------------------
    this.interval = null

    return super.init()
  }

  reflectedProperties() {
    return ['toggle']
  }

  render() {
    this.innerHTML = this._toggleTemplate()

    return super.render()
  }

  load() {
    return super.load()
  }

  // ---------------------------------------------------------------------------

  /** @returns {string} */
  _toggleTemplate() {
    return /* html */`
      <div class="ark-audio--toggle">
        <label data-recording-time></label>
        <button data-toggle-button>
          btn
        </button>
      </div>
    `
  }

  /** @returns {Boolean} */
  isToggle() {
    return this.hasAttribute('toggle')
  }

  initInterval() {
    this.interval = setInterval(_ => {

    })
  }

  // ---------------------------------------------------------------------------

  /** @returns {HTMLLabelElement} */
  get recordingTimeLabel() {
    return this.querySelector('[data-recording-time]')
  }
}
customElements.define('ark-audio', Audio)
