import { Component } from '../../component'
import { getSlots } from '../../../utils'

export class Modal extends Component {
	init (context = {}) {
		this.title = context['title']
		this.subtitle = context['subtitle']

		// local variables
		this.slots = getSlots(this)

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

      <div class="ark-modal__scrim" listen on-click="close"></div>
    `

		this._appendSlots()
		return super.render()
	}

	load () {
		this.querySelectorAll('[close]').forEach(button =>
			button.addEventListener('click', _ => this.close())
		)

		return super.load()
	}

	open () {
		this.setAttribute('show', '')
	}

	close () {
		this.removeAttribute('show')
	}

	toggle () {
		this.hasAttribute('show') ? this.close() : this.open()
	}

	// ---------------------------------------------------------------------------
	/** @returns {Object} */
	get slots () {
		return this._slots || {}
	}

	/** @param {Object} value */
	set slots (value) {
		this._slots = Object.keys(this._slots || {}).length ? this._slots : value
	}

	// ---------------------------------------------------------------------------
	_appendSlots () {
		if (!Object.keys(this._slots || {}).length) return

		const general = this.slots['general'] || []
		const action = this.slots['action'] || []

		general.forEach(slot => {
			this.querySelector('[data-body]').appendChild(slot)
		})

		action.forEach(slot => {
			this.querySelector('[data-actions]').appendChild(slot)
		})
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
customElements.define('ark-modal', Modal)
