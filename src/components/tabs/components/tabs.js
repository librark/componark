/**
 * @typedef {import('./tabs.item').TabsItem} TabsItem
 **/
import { Component } from '../../../base/component'
import { styles }  from '../styles'

const tag = 'ark-tabs'
export class Tabs extends Component {
  init (context = {}) {
    return super.init()
  }

  render () {
    return super.render()
  }

  async load () {
    if (!this.currentTab) {
      const tab = /** @type {TabsItem} */(
        this.tabs.length ? this.tabs[0] : null
      )

      if (tab) tab.setAttribute('active', '')
    }

    this.addEventListener('click', this.onAlterCurrentTab.bind(this))
  }

  /** @param {MouseEvent} event */
  onAlterCurrentTab (event) {
    const target = /** @type {HTMLElement} */(event.target)
    const tab = /** @type {TabsItem} */ (target.closest('ark-tabs-item'))
    if (!tab) return

    this.currentTab.removeAttribute('active')
    tab.setAttribute('active', '')

    this.dispatchEvent(new CustomEvent('tabs:selected', {
      detail: {
        data: tab,
        origin: event
      }
    }))
  }

  /** @returns {TabsItem} */
  get currentTab () {
    return /** @type {TabsItem} */ (this.select('ark-tabs-item[active]'))
  }

  get tabs () {
    return this.selectAll('ark-tabs-item')
  }
}
Component.define(tag, Tabs, styles)
