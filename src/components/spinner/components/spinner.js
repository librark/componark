import { Component } from '../../../base/component'
import { styles } from '../styles'

const tag = 'ark-spinner'
export class Spinner extends Component {
  init(context = {}) {
    this.size = context.size || this.size || '1.5rem'
    this.type = context.type || this.type || 'circle'

    return super.init()
  }

  reflectedProperties() {
    return ['size', 'type']
  }

  render() {
    this.innerHTML = /* html */ `
      ${this.spinnerType(this.type)}
    `

    return super.render()
  }

  /** @returns {HTMLElement} */
  get loader() {
    return this.querySelector('[data-loader]')
  }

  spinnerType(type) {
    let content = ''

    switch (type) {
      case 'circle':
        content = /*html*/ `
        <div data-loader class="sk-fading-circle">
          <div class="sk-circle1 sk-circle"></div>
          <div class="sk-circle2 sk-circle"></div>
          <div class="sk-circle3 sk-circle"></div>
          <div class="sk-circle4 sk-circle"></div>
          <div class="sk-circle5 sk-circle"></div>
          <div class="sk-circle6 sk-circle"></div>
          <div class="sk-circle7 sk-circle"></div>
          <div class="sk-circle8 sk-circle"></div>
          <div class="sk-circle9 sk-circle"></div>
          <div class="sk-circle10 sk-circle"></div>
          <div class="sk-circle11 sk-circle"></div>
          <div class="sk-circle12 sk-circle"></div>
        </div> 
        `
        break

      case 'chase':
        content = /*html*/ `
        <div data-loader class="sk-chase">
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
        </div>
        `
        break

      case 'rect':
        content = /*html*/ `
        <div data-loader class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
        `
        break

      case 'loader':
        content = /* html */ `
        <div data-loader class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        `
        break
      case 'bounce':
        content = /* html */ `
        <div data-loader class="bouncer">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>      
        `
        break
    }
    return content
  }
}
Component.define(tag, Spinner, styles)
