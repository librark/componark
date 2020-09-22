import { Alert, Component } from '../../loader'

export class AlertDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `
      <div>
        <p>This is a alert.</p>
        <button listen on-click="_onClick">open</button>
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
    `

    this._onClick()

    return super.render()
  }

  _onClick (event) {
    Alert.launch({
      title: 'Title....',
      text: 'Text ....',
      showConfirmButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonBackground: 'info',
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      cancelButtonBackground: 'dark',
      horizontal: 'end',
      vertical: 'end'
    }, this)
  }
}
customElements.define('demo-alert', AlertDemo)
