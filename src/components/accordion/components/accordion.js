/** @typedef {import('./accordion.tab.js').AccordionTab} AccordionTab */

import { Component } from 'components/component'

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
    this.addEventListener('click', this.onAccordionTabClick.bind(this))
  }

  /** @param {MouseEvent} event */
  onAccordionTabClick (event) {
    event.stopImmediatePropagation()

    const target = /** @type {HTMLElement} */ (event.target)
    const header = target.closest('.ark-accordion-tab__btn-header')

    if (!header) return

    const tab = /** @type {AccordionTab} */ (
      header.closest('ark-accordion-tab')
    )

    tab.toggle()

    if (this.multiple) return

    this.tabs.forEach(item => {
      if (item.index !== tab.index) item.close()
    })
  }

  /** @returns {boolean} */
  get multiple () {
    return this.hasAttribute('multiple')
  }

  /** @returns {AccordionTab[]} */
  get tabs () {
    return /** @type {Array<AccordionTab>} */ ([
      ...this.selectAll('ark-accordion-tab')
    ])
  }
}
customElements.define('ark-accordion', Accordion)
