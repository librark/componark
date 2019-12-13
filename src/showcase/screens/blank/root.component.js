import { Component } from '../loader'
import { ThemeService } from '../theme/theme.service'

export class RootComponent extends Component {
  init (context) {
    // -------------------------------------------------------------------------
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

  themeService (style) {
    new ThemeService(style)
  }
}
customElements.define('app-root', RootComponent)
