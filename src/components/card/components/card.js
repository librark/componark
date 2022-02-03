import { Component } from '../../../base/component/index.js'
import { getSlots } from '../../../base/utils/index.js'
import { styles } from '../styles/index.js'

const tag = 'ark-card'
export class Card extends Component {
  init (context = {}) {
    this.binding = 'card-listen'
    this.title = context.title
    this.subtitle = context.subtitle
    this.global = context.global || window
    this.headerAlign = context.headerAlign || this.headerAlign || 'left'

    return super.init()
  }

  reflectedProperties () {
    return ['title', 'subtitle', 'headerAlign']
  }

  render () {
    const slots = getSlots(this)

    this._renderMedia(slots)
    this._renderHeader(slots)
    this._renderBody(slots)
    this._renderActions(slots)

    return super.render()
  }

  _renderMedia (slots) {
    const mediaSlots = slots.media || []

    if (!mediaSlots.length) return

    const media = this.global.document.createElement('div')
    media.className = 'ark-card__media'

    mediaSlots.forEach(element => {
      media.append(element)
    })

    this.append(media)
  }

  _renderHeader (slots) {
    if (!this.title && !this.subtitle) return

    const header = this.global.document.createElement('div')
    header.className = 'ark-card__header'

    header.setAttribute('header-align', this.headerAlign)

    const title = this.title.trim().length ? /* html */ `
      <div class="ark-card__title">${this.title}</div>
    ` : ''

    const subtitle = this.subtitle.trim().length ? /* html */ `
      <span class="ark-card__subtitle">${this.subtitle}</span>
    ` : ''

    header.innerHTML = /* html */`${title} ${subtitle}`

    this.append(header)
  }

  _renderBody (slots) {
    const bodySlots = slots.general

    if (!bodySlots.length) return

    const body = this.global.document.createElement('div')
    body.className = 'ark-card__body'

    bodySlots.forEach(element => {
      body.append(element)
    })

    this.append(body)
  }

  _renderActions (slots) {
    const actionsSlots = slots.actions || []

    if (!actionsSlots.length) return

    const actions = this.global.document.createElement('div')
    actions.className = 'ark-card__actions'

    actionsSlots.forEach(element => actions.append(element))

    this.append(actions)
  }
}
Component.define(tag, Card, styles)
