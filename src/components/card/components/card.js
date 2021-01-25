import { Component } from 'base/component'
import { getSlots } from 'base/utils'

export class Card extends Component {
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
    const slots = getSlots(this)

    this.content = /* html */ `
      <div class="ark-card__media"></div>
      <div class="ark-card__header"></div>
      <div class="ark-card__body"></div>
      <div class="ark-card__actions"></div>
    `

    this._renderMedia(slots)
    this._renderHeader(slots)
    this._renderBody(slots)
    this._renderActions(slots)

    return super.render()
  }

  _renderMedia (slots) {
    const media = this.select('.ark-card__media')
    const mediaSlots = slots.media || []

    if (!mediaSlots.length) return media.remove()

    mediaSlots.forEach(element => media.append(element))
  }

  _renderHeader (slots) {
    const header = this.select('.ark-card__header')

    const title = this.title.trim().length ? /* html */ `
      <h4 class="ark-card__title">${this.title}</h4>
    ` : ''

    const subtitle = this.subtitle.trim().length ? /* html */ `
      <span class="ark-card__subtitle">${this.subtitle}</span>
    ` : ''

    if (!title && !subtitle) return header.remove()

    header.innerHTML = /* html */`${title} ${subtitle}`
  }

  _renderBody (slots) {
    const body = this.select('.ark-card__body')

    const bodySlots = this.slots.general || []

    if (!slots.length) return body.remove()

    slots.forEach(element => {
      if (element.className === 'ark-card__body') {
        element.childNodes.forEach(child => {
          body.append(child)
        })
      } else if (
        element.className !== 'ark-card__media' &&
        element.className !== 'ark-card__header' &&
        element.className !== 'ark-card__actions'
      ) {
        body.append(element)
      }
    })

    if (!body.childNodes.length) return body.remove()
  }

  _renderActions (slots) {
    const actions = this.select('.ark-card__actions')

    const actionsSlots = this.slots.actions || []

    if (!slots.length) return actions.remove()

    slots.forEach(element => actions.append(element))
  }
}
Component.define('ark-card', Card)
