import { Component } from 'base/component'


export class AudioDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.content = /* html */ `
      <ark-audio></ark-audio>

      <a href="https://github.com/knowark/componark/blob/master/src/components/audio/README.rst">
      * Reference
      </a>
    `
    return super.render()
  }

  //async load () {
    //this.addEventListener('onStopaudio', (
			//[>* @type {CustomEvent} <] event) => {
      //event.stopImmediatePropagation()
      //this.audio.src = event.detail.dataURL
    //})

    //this.addEventListener('onStartaudio', (
			//[>* @type {CustomEvent} <] event) => {
      //event.stopImmediatePropagation()

      //if (event.detail.totalSeconds >= 10) this.arkaudio.stop()
    //})

    //this.addEventListener('onStopaudio', (
			//[>* @type {CustomEvent} <] event) => {
      //event.stopImmediatePropagation()
    //})

    //return super.load()
  //}

  //get audio () {
    //return this.querySelector('[data-audio]')
  //}

  //get arkaudio () {
    //return this.querySelector('[data-ark-audio]')
  //}

}

const styles = `
  demo-audio{
    padding: 1rem;
  }

  audio{
    margin: 1rem;
  }
`
 
Component.define('demo-audio', AudioDemo, styles)
