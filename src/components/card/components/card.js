import { Component } from '../../component'
import { getSlots } from '../../../utils'

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
    this.innerHTML = /* html */ `
      <div class="ark-card__media"></div>
      <div class="ark-card__header"></div>
      <div class="ark-card__body"></div>
      <div class="ark-card__actions"></div>
    `

    this._renderMedia()
    this._renderHeader()
    this._renderBody()
    this._renderActions()

    return super.render()
  }

  _renderMedia () {
    const container = /** @type {HTMLEmbedElement} */(
      this.querySelector('.ark-card__media')
    )

    const slots = /** @type {Array<HTMLElement>} */(this.slots.media || [])

    if (!slots.length) container.remove()

    slots.forEach(element => container.append(element))
  }

  _renderHeader () {
    const container = /** @type {HTMLEmbedElement} */(
      this.querySelector('.ark-card__header')
    )

    const title = this.title.trim().length ? /* html */ `
      <h4 class="ark-card__title">${this.title}</h4>
    ` : ''

    const subtitle = this.subtitle.trim().length ? /* html */ `
      <span class="ark-card__subtitle">${this.subtitle}</span>
    ` : ''

    if (!title.length && !subtitle.length) container.remove()

    container.innerHTML = /* html */`${title} ${subtitle}`
  }

  _renderBody () {
    const container = /** @type {HTMLEmbedElement} */(
      this.querySelector('.ark-card__body')
    )

    const slots = /** @type {Array<HTMLElement>} */(this.slots.general)

    if (!slots.length) container.remove()

    slots.forEach(element => {
      if (element.className === 'ark-card__body') {
        element.childNodes.forEach(child => {
          container.append(child)
        })
      } else if (
        element.className !== 'ark-card__media' &&
        element.className !== 'ark-card__header' &&
        element.className !== 'ark-card__actions'
      ) {
        container.append(element)
      }
    })

    if (!container.childNodes.length) container.remove()
  }

  _renderActions () {
    const container = /** @type {HTMLEmbedElement} */(
      this.querySelector('.ark-card__actions')
    )

    const slots = /** @type {Array<HTMLElement>} */(this.slots.actions || [])

    if (!slots.length) container.remove()

    slots.forEach(element => container.append(element))
  }
}
customElements.define('ark-card', Card)
