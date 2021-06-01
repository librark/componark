import { Component } from 'base/component'
import { Alert } from 'components/alert'

const tag = 'demo-alert'

export class AlertDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `
      <div>
        <p>This is an alert.</p>
        <ark-button background="primary" listen on-click="_onClick">open</ark-button>
        <!-- <button btn-toggle>toggle</button> -->
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

    this._onClick()

    return super.render()
  }

  _onClick (event) {
    Alert.launch({
      title: 'Atención ¡esto es un Alert!',
      text: 'Y este un texto descriptivo',
      showConfirmButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonBackground: 'success',
      contentBackground: 'light',
      contentColor: 'dark',
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      cancelButtonBackground: 'dark',
      horizontal: 'center',
      vertical: 'center'
    }, this)
  }
}

Component.define(tag, AlertDemo)
