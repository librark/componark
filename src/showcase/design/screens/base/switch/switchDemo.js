import { Component } from 'base/component'

const tag = 'demo-switch'
export class SwitchDemo extends Component {
  init(context) {
    return super.init()
  }

  render() {
    this.content = /* html */ `
      <h1>Switch Component</h1>


      <div class="switch-container">
        <h3>Switch normal</h3>
        <ark-switch></ark-switch>
      </div>

      <div class="switch-container">
        <h3>Switch checked by default</h3>
        <ark-switch checked></ark-switch>
      </div>

      <div class="switch-container">
        <h3>Switch disabled</h3>
        <ark-switch disabled></ark-switch>
      </div>

      

      <a target="_blank" href="https://github.com/knowark/componark/blob/master/src/components/spinner/README.rst">
      * Reference
      </a>
    `
    return super.render()
  }
}

const styles = /* css */ `

`
Component.define(tag, SwitchDemo, styles)
