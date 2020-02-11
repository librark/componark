import { Audio, Component } from '../../loader'

export class AudioDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}
      <ark-Audio>
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
    `
    return super.render()
  }

  get styles() {
    return /* html */ `
      <style>
        demo-audio{
          padding: 1rem;
        }
      </style>
    `
  }
}
customElements.define('demo-audio', AudioDemo)
