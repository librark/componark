import { Component } from '../../component'

export class SplitviewDetail extends Component {
	init (context) {
		this.title = context['title'] || this.title || ' '
		this.backButtonIcon = context['backButtonIcon'] || this.backButtonIcon

		// -------------------------------------------------------------------------
		// local variables
		// -------------------------------------------------------------------------
		this.global = document

		this.detail = this.detail || /** @type {Component} */ (
			this.firstElementChild
		)

		if (this.detail && this.detail.init) this.detail.init(context)

		return super.init()
	}

	render () {
		let header = this.querySelector('header')

		if (!header) {
			header = this.global.createElement('header')
			header.classList.add('ark-splitview-detail__header')
			this.insertBefore(header, this.firstChild)
		}

		header.innerHTML = /* html */`
      <button listen on-click="hide"
        class="ark-splitview-detail__button--close">
        ${this._renderBackButtonIcon()}
      </button>
      <div data-master-title class="ark-splitview-detail__title">
        ${this.title}
      </div>
    `

		if (this.detail && this.detail.render) this.detail.render()

		this.hide()
		return super.render()
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

	// ---------------------------------------------------------------------------
	_renderBackButtonIcon () {
		return this.backButtonIcon ? this.backButtonIcon() : '&times;'
	}
}
customElements.define('ark-splitview-detail', SplitviewDetail)
