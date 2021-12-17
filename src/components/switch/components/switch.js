import { Component } from '../../../base/component'
import { styles } from '../styles'

const tag = 'ark-switch'
export class Switch extends Component {
  init (context = {}) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `
      <span listen on-click="onSwitchClicked" data-switch class="${tag}__slider">
      </span>
    `

    this.moveAttributes()

    return super.render()
  }

  onSwitchClicked(event){
    event.stopPropagation()
    const dataSwitch = this.select('[data-switch]')

    if(dataSwitch.hasAttribute('disabled')) return

    !dataSwitch.hasAttribute('checked') ? 
    dataSwitch.setAttribute('checked', '') :
    dataSwitch.removeAttribute('checked')
  }

  moveAttributes () {
    Array.from(this.attributes).forEach(attribute => {
      this.select('[data-switch]').setAttribute(attribute.name, attribute.value)
    })
  }

}
Component.define(tag, Switch, styles)
