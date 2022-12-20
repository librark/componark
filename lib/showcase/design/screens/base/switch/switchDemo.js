import { Component } from 'base/component/index.js'

const tag = 'demo-switch'
export class SwitchDemo extends Component {
  init(context) {
    this.checkStatus = this.checkStatus || 'disabled'
    return super.init()
  }

  render() {
    this.content = /* html */ `
      <h1>Switch Component</h1>


      <div class="switch-container">
        <h3>Switch normal</h3>
        <ark-switch listen on-alter="onDataAlter"></ark-switch>
        <span data-string>Disabled</span>
      </div>

      <div class="switch-container">
        <h3>Switch checked by default</h3>
        <ark-switch checked></ark-switch>
      </div>

      <div class="switch-container">
        <h3>Switch disabled</h3>
        <ark-switch disabled></ark-switch>
      </div>

      

      <a 
        target="_blank" 
        href="https://github.com/knowark/componark/blob/master/lib/components/switch/README.md">
      * Reference
      </a>
    `
    return super.render()
  }

  onDataAlter(event) {
    if(event.detail.value) {
      this.select('[data-string]').innerText = 'Active'
    } else {
      this.select('[data-string]').innerText = 'Disabled'
    }
  }
}

const styles = /* css */ `
  .switch-container {
    display: grid;
  }
`
Component.define(tag, SwitchDemo, styles)
