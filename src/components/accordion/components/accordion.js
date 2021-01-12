import { Component, html, css } from 'base/component'
import { AccordionTab } from './accordion.tab'
import { styles } from '../styles'

const tag = 'ark-accordion'
export class Accordion extends Component {
  init (context = {}) {
    this.addEventListener('click', this._onClick.bind(this))
    return super.init(context)
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
  _onClick (event) {
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
Component.define(tag, Accordion, styles)
