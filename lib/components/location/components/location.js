import { Component } from '../../../base/component/index.js'
import styles from '../styles/index.js'

export class Location extends Component {
  init (context={}) {
    this.global = context.global || window
    return super.init()
  }

  getCurrentPosition (options = {}) {
    return new Promise((resolve, reject) => {
      this.global.navigator.geolocation.getCurrentPosition(
        resolve, reject, options)
    })
  }
}
Component.define('ark-location', Location, styles)
