import { Component, html } from '../../../base/component/index.js'
import { AccordionTab } from './accordion.tab.js'
import styles from '../styles/index.js'

const tag = 'ark-accordion'
export class Accordion extends Component {
  init (context = {}) {
    this.binding = 'accordion-listen'
    this.addEventListener('click', this._onClick.bind(this))
    return super.init(context)
  }

  render () {
    this.tabs.forEach((tab, index) => {
      tab.setAttribute('index', index.toString())
    })

    return super.render()
  }

  /** @param {MouseEvent} event */
  _onClick (event) {
    event.stopPropagation()

    const target = /** @type {HTMLElement} */ (event.target)
    const tab = /** @type {AccordionTab} */ (
      target.closest('ark-accordion-tab'))

    if (!tab) return

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
Component.define(tag, Accordion, styles)
