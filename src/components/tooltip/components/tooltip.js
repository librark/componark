import { Component } from '../../component'

export class Tooltip extends Component {
  init(context = {}) {
    this.position = context['position'] || this.position || 'bottom'
    this.text = context['text'] || this.text

    // -------------------------------------------------------------------------
    // local
    // -------------------------------------------------------------------------
    this.defaultContent = this.defaultContent || this.innerHTML

    return super.init()
  }

  reflectedProperties() {
    return ["position", 'text']
  }

  render() {
    this.innerHTML = /* html */ `
      <div class="ark-tooltip__content">
        ${this.defaultContent}
      </div>
      <small class="ark-tooltip__text ark-tooltip__${this.position}">
        ${this.text}
      </small>
    `

    return super.render()
  }
}
customElements.define('ark-tooltip', Tooltip)
