import { Component } from 'base/component/index.js'

export class AudioDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.content = /* html */ `
      <ark-audio></ark-audio>

      <a href="https://github.com/knowark/componark/blob/master/src/components/audio/README.md">
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
