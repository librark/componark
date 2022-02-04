import { Component } from 'base/component/index.js'

const tag = 'demo-icon'
export class IconDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `
      <h1 class="title">Icon:</h1>

      <h3>Fontawesome</h3>

      <ark-icon name="fas fa-address-book"></ark-icon>
      <ark-icon name="far fa-address-book"></ark-icon>

      <hr/>

      <h3>Material</h3>
      <ark-icon type="mat" name="face"></ark-icon>
      <ark-icon type="mat" name="shopping_cart"></ark-icon>

      <br>

      <a class="reference" target="_blank" href="https://github.com/knowark/componark/tree/master/src/components/icon/README.md">
      * Reference
      </a>
    `

    return super.render()
  }
}
const styles = /* css */`
  .ark-icon {
    font-size: 2rem;
  }
  .ark-icon .title {
    color:var(--primary);
  }
`
Component.define(tag, IconDemo, styles)
