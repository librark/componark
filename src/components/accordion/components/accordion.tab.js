import { Component } from '../../component'

export class AccordionTab extends Component {
	init (context) {
		this.header = context['header']
		this.tabIndex = context['tabIndex']

		return super.init()
	}

	reflectedProperties () {
		return ['header', 'tabIndex']
	}

	render () {
		if (!this.header) {
			this.innerHTML = ''
			return
		}

		this.innerHTML = /* html */ `
      <button class="ark-accordion-tab__btn-header" listen on-click="toggle">
        <span data-accordion-tab-header>${this.header}</span>
      </button>
      <div id="ark-accordion-tab__content">
        ${this.defaultContent}
      </div>
    `

		return super.render()
	}

	open () {
		this.classList.add(`ark-accordion-tab--show`)
		this.setAttribute('active', '')
	}

	close () {
		this.classList.remove(`ark-accordion-tab--show`)
		this.removeAttribute('active')
	}

	/** @param {Event} event */
	toggle (event) {
		event.stopImmediatePropagation()

		this.hasAttribute('active') ? this.close() : this.open()

		this.dispatchEvent(
			new CustomEvent('accordiontab:click', {
				detail: { tabIndex: this.tabIndex }
			})
		)
	}
}
customElements.define('ark-accordion-tab', AccordionTab)
