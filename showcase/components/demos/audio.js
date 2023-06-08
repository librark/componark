import { Component } from '@knowark/componarkjs'

export class AudioDemo extends Component {
  render () {
    this.style.cssText = '--padding:4; --margin:2;'
    this.content = /* html */ `
      <ark-audio></ark-audio>

      <a target="_blank"
         href="https://github.com/knowark/componark/blob/master/lib/components/audio/README.md">
        * Reference
      </a>
    `
    return super.render()
  }
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
