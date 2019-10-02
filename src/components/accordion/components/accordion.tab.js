import { Component } from '../../component'

export class AccordionTab extends Component {
	/**
   *  @param {{header: string} | {}} context
   * */
	init (context = {}) {
		this.header = context['header']

		// local variables
		this.defaultContent = this.defaultContent || this.innerHTML
		this.index = this.index

		return super.init()
	}

	reflectedProperties () {
		return ['header', 'index']
	}

	render () {
		if (!this.header) {
			this.innerHTML = ''
			return
		}

		this.innerHTML = /* html */ `
      <div class="ark-accordion-tab__btn-header" listen on-click="toggle">
        <small data-accordion-tab-header>${this.header}</small>
      </div>
      <div class="ark-accordion-tab__content">
        ${this.defaultContent}
      </div>
    `

		return super.render()
	}

	open () {
		this.setAttribute('active', 'true')
	}

	close () {
		this.removeAttribute('active')
	}

	/** @param {Event} event */
	toggle (event) {
		event.stopImmediatePropagation()

		this.hasAttribute('active') ? this.close() : this.open()

		this.dispatchEvent(
			new CustomEvent('accordiontab:click', {
				bubbles: true,
				detail: {
					index: this.index,
					active: this.hasAttribute('active'),
					origin: event
				}
			})
		)
	}
}
customElements.define('ark-accordion-tab', AccordionTab)
