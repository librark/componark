import { Component } from '../../component'
import { getSlots } from '../../../utils'

export class Modal extends Component {
	init (context) {
		this.title = context['title']
		this.subtitle = context['subtitle']
		return super.init()
	}

	reflectedProperties () {
		return ['title', 'subtitle']
	}

	render () {
		this.slots = getSlots(this)

		this.innerHTML = /* html */ `
      <div class="ark-modal__scrim" listen on-click="close"></div>
      <div class="ark-modal__content">
        <div class="ark-modal__header">
          ${this._renderHeader()}
          <div class="ark-modal__icon-close">
            <button close>&times;</button>
          </div>
        </div>
        <div class="ark-modal__body">
          ${this._getSlots('general')}
        </div>
        <div class="ark-modal__actions">
          ${this._getSlots('action')}
        </div>
      </div>
    `

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

	_getSlots (key) {
		if (!this.slots || !this.slots[key]) {
			return ''
		}

		return /* html */ `
        ${this.slots[key].map(element => `${element.outerHTML}`).join('')}
      `
	}

	_renderHeader () {
		const title = this._generateContent(this.title, 'title', 'h3')
		const subtitle = this._generateContent(this.subtitle, 'subtitle', 'span')

		return title === '' && subtitle === ''
			? ''
			: /* html */ `
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
