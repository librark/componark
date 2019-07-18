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
    for (const [index, tab] of this.selectAll('ark-accordion-tab').entries()) {
      tab.setAttribute('tab-index', index.toString())
      tab.setAttribute('listen', 'listen')
      tab.setAttribute('on-accordiontab:click', '_activateTab')
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
