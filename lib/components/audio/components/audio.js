import { Component } from '../../../base/component/index.js'
import styles from '../styles/index.js'

const tag = 'ark-audio'
export class Audio extends Component {
  init (context = {}) {
    this.status = 'idle'
    this.dataURL = null
    this.timerId = null
    this.recorder = null
    this.global = context.global || window

    return super.init()
  }

  reflectedProperties () {
    return ['status']
  }

  render () {
    if (this.status === 'done') {
      this.content = `
      <div class="ark-audio__done">
        <audio class="ark-audio__audio" controls></audio>
        <button listen on-click="reset">❌</button>
      </div>
      `
    } else if (this.status === 'recording') {
      this.content = `
      <div class="ark-audio__recording">
        <label>Recording</label>  
        <span class="ark-audio__timer">00:00</span>
        <button listen on-click="stop">⏹️</button>
      </div>
      `
    } else {
      this.content = `
      <div class="ark-audio__idle">
        <button listen on-click="start">⏺️</button>
      </div>
      `
    }

    return super.render()
  }

  /** @param {Event} event */
  async start (event) {
    event.stopPropagation()
    this.status = 'recording'
    this.render()
    const options = { audio: true }
    const navigator = this.global.navigator
    const stream = await navigator.mediaDevices.getUserMedia(options)

    this.recorder = new this.global.MediaRecorder(stream)
    this.recorder.addEventListener('dataavailable', this._onData.bind(this))
    this.timerId = this._time()
    this.recorder.start()
  }

  /** @param {Event} event */
  stop (event) {
    event.stopPropagation()
    this.status = 'done'
    clearInterval(this.timerId)
    this.recorder.stop()
    this.recorder.stream.getTracks().forEach(track => track.stop())
    this.render()
  }

  reset () {
    this.status = 'idle'
    this.render()
    this.dataURL = null
    this.timerId = null
    this.recorder = null
  }

  _time () {
    let count = 0
    return setInterval(() => {
      count += 1
      const seconds = count % 60
      const minutes = Math.trunc(count / 60)
      let content = `${minutes < 10 ? '0' + minutes : minutes}:`
      content += `${seconds < 10 ? '0' + seconds : seconds}`

      const timer = this.select('.ark-audio__timer')
      timer.textContent = content
    }, 1000)
  }

  /** @param {any} event */
  _onData (event) {
    const audio = this.select('.ark-audio__audio')
    audio.src = this.global.URL.createObjectURL(event.data)
    const reader = new this.global.FileReader()
    reader.readAsDataURL(event.data)
    reader.onloadend = () => { this.dataURL = reader.result }
  }
}
Component.define(tag, Audio, styles)
