import { Component } from "../../../base/component/index.js"
import styles from "../styles/index.js"

const tag = "ark-spinner"
export class Spinner extends Component {
  init(context = {}) {
    this.size = context.size || this.size || "1"
    this.type = context.type || this.type || "circle"

    return super.init()
  }

  reflectedProperties() {
    return ["size", "type"]
  }

  render() {
    this.innerHTML = /* html */ `
      ${this.spinnerType(this.type)}
    `
    this.setSize(this.size)
    return super.render()
  }

  setSize(size) {
    this.style.setProperty('transform', `scale(${size})`)
  }

  /** @returns {HTMLElement} */
  get loader() {
    return this.querySelector("[data-loader]")
  }

  spinnerType(type) {
    let content = ""

    if (type === 'circle') {
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
    } else if (type === 'chase') {
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
    } else if (type === 'rect') {
      content = /*html*/ `
      <div data-loader class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
      `
    } else if (type === 'loader') {
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
    } else {
      content = /* html */ `
      <div data-loader class="bouncer">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>      
      `
    }

    return content
  }
}
Component.define(tag, Spinner, styles)
