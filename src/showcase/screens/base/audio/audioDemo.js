import { Audio, Component } from '../../loader'

export class AudioDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}
      <ark-Audio></ark-Audio>

      [[audio]]
    `
    return super.render()
  }

  get styles() {
    return /* html */ `
      <style>
      </style>
    `
  }
}
customElements.define('demo-audio', AudioDemo)
