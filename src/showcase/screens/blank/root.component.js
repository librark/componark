import { Component } from '../loader'

export class RootComponent extends Component {
  init (context) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ ``

    return super.render()
  }

  load () {
    this.dispatchEvent(
      new CustomEvent('blank:load', {
        bubbles: true
      })
    )

    return super.load()
  }

  getStyleLink (currentStyle) {
    if (currentStyle === 'material') {
      // @ts-ignore
      require('../theme/styles/main-material.scss')
    } else {
      // @ts-ignore
      require('../theme/styles/main-ark.scss')
    }
  }
}
customElements.define('app-root', RootComponent)
