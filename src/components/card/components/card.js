import { getSlots } from '../../../utils'

export class Card extends HTMLElement {
  init (context) {
    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.slots = getSlots(this)

    this.innerHTML = /* html */`
      ${this._getMedia()}
      ${this._getHeader()}
      ${this._getBody()}
      ${this._getActions()}
    `
  }

  _getSlots (key) {
    if (!this.slots || !this.slots[key]) { return '' }

    return /* html */`
        ${this.slots[key].map((element, index) => `
          ${element.outerHTML}
        `).join('')}
      `.trim()
  }

  _getMedia () {
    return this._generateContent('media', 'media')
  }

  _getHeader () {
    const titles = this._generateContent('title', 'title', 'h3')
    const subtitles = this._generateContent('subtitle', 'subtitle', 'span')

    if (titles === '' && subtitles === '') return ''

    return /* html */`
      <div class="ark-card__header">
          ${titles}
          ${subtitles}
      </div>
    `
  }

  _getBody () {
    return this._generateContent('body', 'general')
  }

  _getActions () {
    return this._generateContent('actions', 'action')
  }

  _generateContent (className, slots, type = 'div') {
    slots = this._getSlots(slots)
    return slots ? /* html */`
      <${type} class="ark-card__${className}">
        ${slots}
      </${type}>
    ` : ''
  }
}
customElements.define('ark-card', Card)
