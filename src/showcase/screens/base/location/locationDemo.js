import { Component } from 'base/component'

export class LocationDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.content = /* html */ `
      <div>
        <ark-button background="primary" listen on-click="getCurrentPosition">
          Get position
        </ark-button>
        <ark-button background="secondary" listen on-click="resetPosition">
          Reset position
        </ark-button>
        <span data-position></span>
      </div>
      <ark-location></ark-location>

      <br>

      <a class="reference" target="_blank" href="https://github.com/knowark/componark/tree/master/src/components/location/README.rst">
      * Reference
      </a>
    `

    return super.render()
  }

  get location () {
    return this.select('ark-location')
  }

  disconnectedCallback () {
    this.location['stop']()
  }

  async getCurrentPosition () {
    this.querySelector('[data-position]').innerHTML = ''

    const position = await this.location['getCurrentPosition']()

    this.querySelector('[data-position]').innerHTML = `
      Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}
    `
  }

  resetPosition() {
    this.querySelector('[data-position]').innerHTML = ''
  }


}
Component.define('demo-location', LocationDemo)
