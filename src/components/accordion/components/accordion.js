/** @typedef {import('./accordion.tab.js').AccordionTab} AccordionTab */
import { Component } from '../../component'

export class Accordion extends Component {
	init (context) {
		this.closeOthers = context['closeOthers']
		return super.init()
	}

	reflectedProperties () {
		return ['closeOthers']
	}

	render () {
		const tabs = this.selectAll('ark-accordion-tab').entries()

		while (this.firstChild) this.removeChild(this.firstChild)

		for (const [index, tab] of tabs) {
			tab.setAttribute('tab-index', index.toString())
			tab.addEventListener('accordiontab:click', this._activateTab.bind(this))
			this.append(tab)
		}

		return super.render()
	}

	_activateTab (event) {
		event.stopPropagation()
		if (!this.hasAttribute('close-others')) return

		if (
			this['closeOthers'] === 'true' ||
      !this['closeOthers'].toString().length
		) {
			this.selectAll('ark-accordion-tab').forEach((
				/** @type {AccordionTab} */ tab
			) => {
				tab.close()
			})

			event.target.open()
		}
	}
}
customElements.define('ark-accordion', Accordion)
