import { Component } from '../loader'
import { importStyles } from '../theme'

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
    importStyles(currentStyle)
  }
}
customElements.define('app-root', RootComponent)
