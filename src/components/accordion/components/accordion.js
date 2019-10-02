/** @typedef {import('./accordion.tab.js').AccordionTab} AccordionTab */

import { Component } from '../../component'

export class Accordion extends Component {
	init () {
		return super.init()
	}

	render () {
		this.tabs.forEach((tab, index) => {
			tab.setAttribute('index', index.toString())
		})

		return super.render()
	}

	load () {
		this.addEventListener('accordiontab:click',
			this.onAccordiontabClick.bind(this)
		)

		return super.load()
	}

	/** @param {event} event */
	onAccordiontabClick (event) {
		event.stopImmediatePropagation()

		if (this.multiple) return

		const tab = /** @type {AccordionTab} */ (event.target)
		const detail = event['detail']

		this.tabs.forEach(tab => { tab.close() })

		if (detail.active) tab.open()
	}

	// ---------------------------------------------------------------------------
	/** @returns {boolean} */
	get multiple () {
		return this.hasAttribute('multiple')
	}

	/** @param {boolean} value */
	set multiple (value) {
		if (value) {
			this.setAttribute('multiple', 'true')
		} else {
			this.removeAttribute('multiple')
		}
	}

	/** @returns {AccordionTab[]} */
	get tabs () {
		return /** @type {Array<AccordionTab>} */ ([
			...this.selectAll('ark-accordion-tab')
		])
	}
}
customElements.define('ark-accordion', Accordion)
