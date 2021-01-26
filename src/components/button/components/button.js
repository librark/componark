import { Component } from 'base/component'
import { styles } from '../styles'

const tag = 'ark-button'
export class Button extends Component {
  constructor () {
    super()
    this.defaultContent = this.defaultContent || this.innerHTML
    this.navigatorObject = navigator
  }

  init (context = {}) {
    return super.init()
  }

  reflectedProperties() {
    return [
      'href', 'horizontal', 'vertical', 'vibrate'
    ]
  }

  render () {
    const element = this['href'] ? 'a' : 'button'
    const href = this['href'] ? `href="${this['href']}"` : ''
    this.content = `
      <${element} ${href} class='ark-button__button'>
        ${this.innerHTML}
      </${element}>
    `

    const properties = ['class', 'horizontal', 'vertical', 'vibrate']
    for (const attribute of Array.from(this.attributes)) {
      if (properties.includes(attribute.name)) continue
      this.firstElementChild.setAttribute(attribute.name, attribute.value)
    }

    if (this.hasAttribute('fab')) {
      this['horizontal'] = 'end'
      this['vertical'] = 'end'
    }

    return super.render()
  }
}
Component.define(tag, Button, styles)
