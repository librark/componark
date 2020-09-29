import { Component } from 'components/component'
import { getSlots } from 'utils'

export class Modal extends Component {
  init (context = {}) {
    this.title = context.title
    this.subtitle = context.subtitle

    // local variables
    this.slots = this.slots || getSlots(this)

    return super.init()
  }

  reflectedProperties () {
    return ['title', 'subtitle']
  }

  render () {
    this.innerHTML = /* html */ `
      <div class="ark-modal__content">
        <div class="ark-modal__header">
          ${this._renderHeader()}
        </div>
        <div class="ark-modal__body" data-body></div>
        <div class="ark-modal__actions" data-actions></div>
      </div>

      <div data-scrim class="ark-modal__scrim"></div>
    `

    this._appendSlots()
    return super.render()
  }

  load () {
    if (!this._isBlockedScrim()) {
      this.scrim.addEventListener('click', _ => this.close())
    }

    this.querySelectorAll('[close]').forEach(
      button => button.addEventListener('click', _ => this.close())
    )
  }

  open () {
    this.setAttribute('show', '')
    this._onHiddenEvent()
  }

  close () {
    this.removeAttribute('show')
    this._onHiddenEvent()
  }

  toggle () {
    this.hasAttribute('show') ? this.close() : this.open()
  }

  /** @return {HTMLDivElement} */
  get scrim () {
    return this.querySelector('[data-scrim]')
  }

  _appendSlots () {
    if (!Object.keys(this.slots || {}).length) return

    const general = this.slots.general || []
    const action = this.slots.action || []

    general.forEach(
      slot => this.querySelector('[data-body]').appendChild(slot)
    )

    action.forEach(
      slot => this.querySelector('[data-actions]').appendChild(slot)
    )
  }

  _renderHeader () {
    const title = this._generateContent(this.title, 'title', 'h3')
    const subtitle = this._generateContent(this.subtitle, 'subtitle', 'span')

    return /* html */ `
      <div class="ark-modal__title">
        ${title}
        ${subtitle}
      </div>
    `
  }

  _onHiddenEvent () {
    this.dispatchEvent(new CustomEvent('onHiddenModal', {
      bubbles: true,
      detail: {
        hidden: !this.hasAttribute('show')
      }
    }))
  }

  _generateContent (content, className, type = 'div') {
    return content
      ? /* html */ `
      <${type} class="ark-card__${className}">
        ${content}
      </${type}>
    `
      : ''
  }

  /** @return {boolean} */
  _isBlockedScrim () {
    return this.hasAttribute('block-scrim')
  }
}
customElements.define('ark-modal', Modal)
