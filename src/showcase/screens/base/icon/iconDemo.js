import { Component } from 'base/component'

export class IconDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `
      <p>Icon:</p>
      <hr/><br/>

      <h1>Fontawesome</h1>

      <ark-icon name="fas fa-address-book"></ark-icon>
      <ark-icon name="far fa-address-book"></ark-icon>

      <hr/>

      <h1>Material</h1>
      <ark-icon type="mat" name="face"></ark-icon>
      <ark-icon type="mat" name="face"></ark-icon>
    `

    return super.render()
  }
}
Component.define('demo-icon', IconDemo)
