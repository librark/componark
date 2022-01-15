import { Component } from 'base/component/index.js'
import { Alert } from 'components/alert/index.js'

const tag = 'demo-alert'

export class AlertDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `
      <div>
        <p>This is an alert.</p>
        <ark-button background="primary" listen on-click="_onClick">open</ark-button>
      </div>

      <div>
        <h3>ark-alert</h3>
        <small>Attributes:</small>
        <hr />
        <p>horizontal, vertical:</p>
        <ul>
          <li>center </li>
          <li>start</li>
          <li>end</li>
        </ul>
      </div>

      <a target="_blank" href="https://github.com/knowark/componark/blob/master/src/components/alert/README.rst">
      * Reference
      </a>
      
    `

    return super.render()
  }

  async load() {
    const alert = this.querySelector('ark-alert')
    if (alert) {
      alert.addEventListener('alert:confirm', (event) => {
        console.log('works')
      })
    }
  }

  _onClick(event) {
    if (!this.select('ark-alert')) {
      Alert.launch(
        {
          title: 'Atención ¡esto es un Alert!',
          text: 'Y este un texto descriptivo',
          showConfirmButton: true,
          confirmButtonText: 'Confirm',
          confirmButtonBackground: 'success',
          contentBackground: 'light',
          contentColor: 'dark',
          showCancelButton: false,
          horizontal: 'center',
          vertical: 'center',
        },
        this
      )
      const alert = this.selector('ark-alert')
      alert.addEventListener('alert:confirm', () => this.openTrue())
    }
  }

  openTrue() {
    console.log('true')
  }
}

Component.define(tag, AlertDemo)
