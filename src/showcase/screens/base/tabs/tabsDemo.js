import { Component } from 'base/component'

const tag = 'demo-tabs'
export class TabsDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.content = /* html */`
      <div>
        <p>This is a tabs.</p>
      </div>

      <ark-tabs background="light" color="dark" listen on-tabs:selected="onSelectedTab">
        <ark-tabs-item title="tab 1" tab="example-1">
          <ark-icon name="far fa-address-book"></ark-icon>
        </ark-tabs-item>
        <ark-tabs-item title="tab 2" tab="example-2">
          <ark-icon name="far fa-address-book"></ark-icon>
        </ark-tabs-item>
        <ark-tabs-item title="tab 3" tab="example-3">
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

      <a target="_blank" href="https://github.com/knowark/componark/blob/master/src/components/tabs/README.rst" class="reference">
      * Reference
      </a>
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

  get tabs () {
    return this.select('ark-tabs')
  }

  /** @returns {HTMLElement} */
  get tabContent () {
    return this.querySelector('[tab-content]')
  }
}
Component.define(tag, TabsDemo)
