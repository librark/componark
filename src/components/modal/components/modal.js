import { Component } from '../../component'
import { getSlots } from '../../../utils'

export class Modal extends Component {
	init (context) {
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
      <div class="ark-modal__scrim" listen on-click="close"></div>
      <div class="ark-modal__content">
        <div class="ark-modal__header">
          ${this._renderHeader()}
          <div class="ark-modal__icon-close">
            <button close>&times;</button>
          </div>
        </div>

        <div class="ark-modal__body" data-body></div>

        <div class="ark-modal__actions" data-actions></div>

      </div>
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
		this.setAttribute('open', '')
	}

	close () {
		this.removeAttribute('open')
	}

	toggle () {
		this.hasAttribute('open')
			? this.removeAttribute('open')
			: this.setAttribute('open', '')
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
		general.forEach(slot => {
			this.querySelector('[data-body]').appendChild(slot)
		})

		const action = this.slots['action'] || []
		action.forEach(slot => {
			this.querySelector('[data-actions]').appendChild(slot)
		})
	}

	_renderHeader () {
		const title = this._generateContent(this.title, 'title', 'h3')
		const subtitle = this._generateContent(this.subtitle, 'subtitle', 'span')

		return title.length && subtitle.length
			? /* html */ `
        <div class="ark-modal__title">
            ${title}
            ${subtitle}
        </div>
      ` : ''
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
