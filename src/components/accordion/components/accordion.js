/** @typedef {import('./accordion.tab.js').AccordionTab} AccordionTab */
import { Component } from '../../component'

export class Accordion extends Component {
  properties () {
    return ['close-others']
  }

  render () {
    for (let [index, tab] of this.selectAll('ark-accordion-tab').entries()) {
      tab.setAttribute('tab-index', index.toString())
      tab.setAttribute('listen', 'listen')
      tab.setAttribute('on-accordiontab:click', 'activateTab')
    }
    return super.render()
  }

  activateTab (event) {
    event.stopPropagation()
    if (!this.hasAttribute('close-others')) return

    const closeAttr = this['close-others']
    if (closeAttr === 'true' || !closeAttr.toString().length) {
      this.selectAll('ark-accordion-tab').forEach(
        (/** @type {AccordionTab} */ tab) => {
          tab.close()
        })

      event.target.open()
    }
  }
}
customElements.define('ark-accordion', Accordion)
