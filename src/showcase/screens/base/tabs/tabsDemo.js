/**
 * @typedef {import('../../loader').Tabs} Tabs
 **/
import { Component } from '../../loader'

export class TabsDemo extends Component {
	init (context) {
		return super.init(context)
	}

	render () {
		this.innerHTML = /* html */`
      <div>
        <p>This is a tabs.</p>
      </div>

      <ark-tabs listen on-tabs:selected="onSelectedTab">
        <ark-tabs-item title="tab 1" tab="example-1">
          <ark-icon name="far fa-address-book"></ark-icon>
        </ark-tabs-item>
        <ark-tabs-item title="tab 2" tab="example-2">
          <ark-icon name="far fa-address-book"></ark-icon>
        </ark-tabs-item>
        <ark-tabs-item title="tab 3" tab="example-3" active>
          <ark-icon name="far fa-address-book"></ark-icon>
        </ark-tabs-item>
        <ark-tabs-item title="tab 4" tab="example-4">
          <ark-icon name="far fa-address-book"></ark-icon>
        </ark-tabs-item>
        <ark-tabs-item title="tab 5" tab="example-5">
          <ark-icon name="far fa-address-book"></ark-icon>
        </ark-tabs-item>
      </ark-tabs>

      <div tab-content></div>
    `

		const currentTab = this.tabs.currentTab ? this.tabs.currentTab.tab : ''
		this.updateContent(currentTab)

		return super.render()
	}

	updateContent (tab) {
		if (tab === 'example-1') {
			this.tabContent.innerHTML = /* html */`
        <h1>Example 1</h1>
      `
		} else if (tab === 'example-2') {
			this.tabContent.innerHTML = /* html */`
        <h1>Example 2</h1>
      `
		} else if (tab === 'example-3') {
			this.tabContent.innerHTML = /* html */`
        <h1>Example 3</h1>
      `
		} else if (tab === 'example-4') {
			this.tabContent.innerHTML = /* html */`
        <h1>Example 4</h1>
      `
		} else if (tab === 'example-5') {
			this.tabContent.innerHTML = /* html */`
        <h1>Example 5</h1>
      `
		}
	}

	/** @param {CustomEvent} event */
	onSelectedTab (event) {
		event.stopImmediatePropagation()
		const tabItem = event.detail.data

		this.updateContent(tabItem.tab)
	}

	/** @returns {Tabs} */
	get tabs () {
		return /** @type {Tabs} */(this.select('ark-tabs'))
	}

	/** @returns {HTMLElement} */
	get tabContent () {
		return this.querySelector('[tab-content]')
	}
}
customElements.define('demo-tabs', TabsDemo)
