import { Component } from 'base/component'
import { AccordionTab } from './accordion.tab'

import { stylesMap } from '../styles'

console.log('ArkCss>>>', stylesMap);

export class Accordion extends Component {
  init () {
    this.addEventListener(
      'click', this.onAccordionTabClick.bind(this))
    return super.init()
  }

  render () {
    this.tabs.forEach((tab, index) => {
      tab.setAttribute('index', index.toString())
    })

    return super.render()
  }

  async load () {
    //this.addEventListener('click', this.onAccordionTabClick.bind(this))
  }

  /** @param {MouseEvent} event */
  onAccordionTabClick (event) {
    console.log('Clicked!!!!');
    event.stopPropagation()

    const target = /** @type {HTMLElement} */ (event.target)
    const header = target.closest('.ark-accordion-tab__btn-header')

    if (!header) return

    const tab = /** @type {AccordionTab} */ (
      header.closest('ark-accordion-tab')
    )

    tab.toggle()

    if (this.hasAttribute('multiple')) return

    this.tabs.forEach(item => {
      if (item['index'] !== tab['index']) item.close()
    })
  }

  /** @returns {AccordionTab[]} */
  get tabs () {
    return /** @type {Array<AccordionTab>} */ ([
      ...this.selectAll('ark-accordion-tab')
    ])
  }
}
customElements.define('ark-accordion', Accordion)
