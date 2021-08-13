import { Component } from '../../../base/component'
import { styles } from '../styles'

const tag = 'ark-button'
export class Button extends Component {
  init(context = {}) {
    const slots = this.slots()

    this.iconPosition = context.iconPosition || this.iconPosition || 'left'

    const [body] = slots['general']
    const [icon] = slots['icon'] || []

    this.body = this.body || body || this.innerText
    this.icon = this.icon || icon || ''

    this.horizontal = context.horizontal || this.horizontal
    this.vertical = context.vertical || this.vertical

    this.size = context.size || this.size

    return super.init()
  }

  reflectedProperties() {
    return ['href', 'horizontal', 'vertical', 'vibrate', 'iconPosition', 'size']
  }

  render() {
    const element = this['href'] ? 'a' : 'button'
    const href = this['href'] ? `href="${this['href']}"` : ''
    this.content = /* html */ `
      <${element} ${href} class="ark-button__button">
        <div class="ark-button__icon"></div>
        <div class="ark-button__body"></div>
      </${element}>
    `

    const properties = ['class', 'horizontal', 'vertical', 'vibrate']
    for (const attribute of Array.from(this.attributes)) {
      if (properties.includes(attribute.name)) continue
      this.firstElementChild.setAttribute(attribute.name, attribute.value)
    }

    if (this.hasAttribute('fab')) {
      this.parentNode.style.position = 'relative'
      this['horizontal'] = this.horizontal || 'end'
      this['vertical'] = this.vertical || 'end'
    }

    const button = this.select('.ark-button__button')
    const body = this.select('.ark-button__body')
    const icon = this.select('.ark-button__icon')

    body.append(this.body)
    icon.append(this.icon)

    this.iconPosition == 'right'
      ? (icon.style.gridColumn = '2')
      : (icon.style.gridColumn = '1')

    return super.render()
  }
}
Component.define(tag, Button, styles)
