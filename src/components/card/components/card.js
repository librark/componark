import { Component } from '../../component'
import { getSlots } from '../../../utils'

export class Card extends Component {
	init (context = {}) {
		this.title = context['title']
		this.subtitle = context['subtitle']

		// local variables
		this.slots = this.slots || getSlots(this)

		return super.init()
	}

	reflectedProperties () {
		return ['title', 'subtitle']
	}

	render () {
		this.innerHTML = /* html */ `
      ${this._renderMedia()}
      ${this._renderHeader()}
      ${this._renderBody()}
      ${this._renderActions()}
    `
		return super.render()
	}

	_getSlots (key) {
		if (!this.slots || !this.slots[key]) return ''

		return /* html */ `
        ${this.slots[key].map(element => `${element.outerHTML}`).join('')}
      `.trim()
	}

	_renderMedia () {
		const content = this._getSlots('media')
		return this._generateContent(content, 'media')
	}

	_renderHeader () {
		const title = this._generateContent(this.title, 'title', 'h4')
		const subtitle = this._generateContent(this.subtitle, 'subtitle', 'span')

		return title === '' && subtitle === ''
			? ''
			: /* html */ `
      <div class="ark-card__header">
          ${title}
          ${subtitle}
      </div>
    `
	}

	_renderBody () {
		const content = this._getSlots('general')
		return this._generateContent(content, 'body')
	}

	_renderActions () {
		const content = this._getSlots('action')
		return this._generateContent(content, 'actions')
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
}
customElements.define('ark-card', Card)
