import { Component } from '../../component'

export class SplitviewDetail extends Component {
	init (context) {
		this.title = context['title'] || this.title || ''

		this.data = context['data'] || this.data || null
		this.template = context['template'] || this.template || null

		this.backButtonIcon = context['backButtonIcon'] || this.backButtonIcon
		this.defaultTemplate = context['defaultTemplate'] || this.defaultTemplate
		return super.init()
	}

	render () {
		if (this.template && this.data) {
			this.innerHTML = /* html */ `
        <header class="ark-splitview-detail__header">
          <button listen on-click="hide"
            class="ark-splitview-detail__button--close">
            ${this._renderBackButtonIcon()}
          </button>
          <div data-master-title class="ark-splitview-detail__title">
            ${this.title}
          </div>
        </header>
        <div class="ark-splitview-detail__body">
          ${this.template(this.data)}
        </div>
      `
			this.show()
		} else {
			this.innerHTML = this._innerHtmlDefaultTemplate()
			this.hide()
		}

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
	_innerHtmlDefaultTemplate () {
		const template = this.defaultTemplate ? this.defaultTemplate() : ''

		return /* html */ `
      <div class='ark-splitview-detail__default-template'>
        ${template}
      </div>
    `
	}

	_renderBackButtonIcon () {
		return this.backButtonIcon ? this.backButtonIcon() : '&times;'
	}
}
customElements.define('ark-splitview-detail', SplitviewDetail)
