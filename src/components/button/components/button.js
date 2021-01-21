import { Component } from 'base/component'

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
      'href', 'horizontal', 'vertical'
    ]
  }

  render () {
    const element = this['href'] ? 'a' : 'button'

    this.content = `
      <${element} href"${this['href']}>
        ${this.innerHTML}
      <${element}>
    `

    const properties = ['class', 'horizontal', 'vertical']
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
Component.define(tag, Button)
