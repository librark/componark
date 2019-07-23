import { Component } from '../../component'
import { getSlots } from '../../../utils'

export class Alert extends Component {
	init (context) {
		this.title = context['title']
		this.text = context['text']
		this.horizontal = context['horizontal'] || this.horizontal || 'center'
		this.vertical = context['vertical'] || this.vertical || 'center'
		this.showConfirmButton = context['showConfirmButton']
		this.confirmButtonText =
      context['confirmButtonText'] || this.confirmButtonText || 'Aceptar'
		this.confirmButtonBackground =
      context['confirmButtonBackground'] ||
      this.confirmButtonBackground ||
      'primary'
		this.showCancelButton = context['showCancelButton']
		this.cancelButtonText =
      context['cancelButtonText'] || this.cancelButtonText || 'Cancelar'
		this.cancelButtonBackground =
      context['cancelButtonBackground'] ||
      this.cancelButtonBackground ||
      'light'

		return super.init()
	}

	reflectedProperties () {
		return [
			'title',
			'text',
			'horizontal',
			'vertical',
			'showConfirmButton',
			'confirmButtonText',
			'confirmButtonBackground',
			'showCancelButton',
			'cancelButtonText',
			'cancelButtonBackground'
		]
	}

	render () {
		this.slots = getSlots(this)
		this.innerHTML = /* html */ `
      <div class="ark-alert__body">
        <div class="ark-alert__content">
          ${this._renderTitle()}
          ${this._renderText()}
          ${this._getSlots('general')}
        </div>
        ${this._renderActions()}
      </div>
      <div class="ark-alert__scrim" listen on-click="close"></div>
    `
		return super.render()
	}

	async load () {
		this.querySelectorAll('[close]').forEach(element =>
			element.addEventListener('click', _ => this.close())
		)
		return super.load()
	}

	/** @param {Object} context @param {HTMLElement=} parent @return {Alert} */
	static launch (context, parent = document.body) {
		/** @type {Alert} */
		const alert = new Alert()
		alert.init(context)
		parent.appendChild(alert)
		return alert
	}

	close () {
		this.remove()
	}

	show () {
		this.removeAttribute('hidden')
	}

	hide () {
		this.setAttribute('hidden', '')
	}

	toggle () {
		this.hasAttribute('hidden') ? this.show() : this.hide()
	}

	// ---------------------------------------------------------
	// renders
	// ---------------------------------------------------------

	_renderTitle () {
		return this.title
			? /* html */ `<h4 class="ark-alert__title">${this.title}</h4>`
			: ''
	}

	_renderText () {
		return this.text ? /* html */ `<p>${this.text}</p>` : ''
	}

	_renderActions () {
		let content = ''
		content += this._getSlots('action')
		content += this._renderConfirmButton()
		content += this._renderCancelButton()

		return content.trim().length
			? /* html */ `
      <div class="ark-alert__actions">${content}</div>
    `
			: ''
	}

	_renderConfirmButton () {
		return this._parseBooleanValue(this.showConfirmButton) &&
      this.confirmButtonText.length
			? /* html */ `
      <button listen on-click="_clickConfirmButton" alert-confirm-button
        background="${this.confirmButtonBackground}">
        ${this.confirmButtonText}
      </button>
    `
			: ''
	}

	/** @param {Event} event */
	_clickConfirmButton (event) {
		event.stopImmediatePropagation()
		this.dispatchEvent(new CustomEvent('alert:confirm-button'))
	}

	_renderCancelButton () {
		return this._parseBooleanValue(this.showCancelButton) &&
      this.cancelButtonText.length !== 0
			? /* html */ `
      <button listen on-click="_clickCancelButton" close alert-cancel-button
        background="${this.cancelButtonBackground}">
        ${this.cancelButtonText}
      </button>
    `
			: ''
	}

	/** @param {Event} event */
	_clickCancelButton (event) {
		event.stopImmediatePropagation()
		this.dispatchEvent(new CustomEvent('alert:cancel-button'))
	}

	_parseBooleanValue (value) {
		if (value === true || value === 'true' || value === '') {
			return true
		} else {
			return false
		}
	}

	_getSlots (key) {
		if (!this.slots || !this.slots[key]) return ''

		return /* html */ `
        ${this.slots[key].map(element => `${element.outerHTML}`).join('')}
      `
	}
}
customElements.define('ark-alert', Alert)
