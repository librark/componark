import { Component } from '../../../base/component/index.js'
import styles from '../styles/index.js'

const tag = 'ark-switch'
export class Switch extends Component {
  init (context = {}) {
    this.value = this.value || false
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `
      <span listen on-click="onSwitchClicked" data-switch class="${tag}__slider">
      </span>
    `

    this.moveAttributes()
    this.value = this.select('[data-switch]').hasAttribute('checked')

    return super.render()
  }

  onSwitchClicked(event){
    event.stopPropagation()
    const dataSwitch = this.select('[data-switch]')

    if(dataSwitch.hasAttribute('disabled')) return

    !dataSwitch.hasAttribute('checked') ? 
    dataSwitch.setAttribute('checked', '') :
    dataSwitch.removeAttribute('checked')

    this.onEmitAlter(event)
  }

  onEmitAlter(event) {
    event.stopPropagation()
    this.value = this.select('[data-switch]').hasAttribute('checked')
    this.emit('alter', {
      value: this.value,
      origin: event
    })
  }

  moveAttributes () {
    Array.from(this.attributes).forEach(attribute => {
      this.select('[data-switch]').setAttribute(attribute.name, attribute.value)
    })
  }

}
Component.define(tag, Switch, styles)
