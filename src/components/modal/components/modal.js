import { Component } from '../../../base/component/index.js'
import { styles } from '../styles/index.js'

const tag = 'ark-modal'
export class Modal extends Component {
  init(context = {}) {
    this.binding = 'modal-listen'

    const slots = this.slots()

    this.body = this.body || slots['general']
    this.actions = this.actions || slots['action'] || []
    this.header = this.header || slots['header'] || []

    this.width = context.width || this.width || ''
    this.height = context.height || this.height || ''

    this.background = context.background || this.background || 'primary'
    this.color = context.color || this.color || ''
    this.round = context.round || this.round || 'sm'

    return super.init()
  }

  reflectedProperties() {
    return [
      'title',
      'subtitle',
      'width',
      'height',
      'background',
      'color',
      'round',
    ]
  }

  render() {
    this.content = /* html */ `
      <div class="ark-modal__content" round="${this.round}" background="${
      this.background
    }" color="${this.color}" ${this._getContentStyle()}>
        <div class="ark-modal__header">
          ${this._renderHeader()}
        </div>
        <div class="ark-modal__body"></div>
        <div class="ark-modal__actions"></div>
      </div>
      
      <div data-scrim class="ark-modal__scrim"></div>
      `

    this.body.forEach((slot) => this.select('.ark-modal__body').append(slot))

    this.actions.forEach((slot) =>
      this.select('.ark-modal__actions').append(slot)
    )

    this.header.forEach((slot) =>
      this.select('.ark-modal__header').append(slot)
    )

    this.selectAll('[close]').forEach((button) =>
      button.addEventListener('click', (_) => {
        this.close()
      })
    )

    if (!this.hasAttribute('block-scrim')) {
      this.select('.ark-modal__scrim').addEventListener('click', (_) =>
        this.close()
      )
    }

    return super.render()
  }

  _renderHeader() {
    let header = ''

    if (this['title'].length) {
      header += /* html */ `
        <strong class="ark-modal__title">${this['title']}</strong>
      `
    }

    if (this['subtitle'].length) {
      header += /* html */ `
        <span class="ark-modal__subtitle">${this['subtitle']}</span>
      `
    }

    return header
  }

  _getContentStyle() {
    const width = this.width ? `width: ${this.width};` : ''
    const height = this.height ? `height: ${this.height};` : ''

    return `style="${width} ${height}"`
  }

  open() {
    this.setAttribute('show', '')
  }

  close() {
    this.removeAttribute('show')
  }

  toggle() {
    this.toggleAttribute('show')
  }
}

Component.define(tag, Modal, styles)
