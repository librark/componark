/**
 * @typedef {import('./detail.js').SplitViewDetail} SplitViewDetail
 * @typedef {import('./master.js').SplitViewMaster} SplitViewMaster
 **/

import { Component } from '../../component'

export class SplitView extends Component {
  init (context = {}) {
    this.detailTitle = context.title || this.detailTitle

    this.detailBackButtonIcon = context.backButtonIcon ||
      this.detailBackButtonIcon

    return super.init()
  }

  render () {
    return super.render()
  }

  load () {
    if (this.master) {
      this.master.addEventListener(
        'master:change',
        this._onMasterChange.bind(this)
      )
    }
  }

  /** @param {Object} context */
  renderDetail (context) {
    // if (!this.detail && !this.detail.init) return
    if (!this.detail || !this.detail.init) return

    context.title = this.detailTitle || context.title
    context.backButtonIcon = this.detailBackButtonIcon ||
      context.backButtonIcon

    this.detail.init(context).render()
    this.detail.show()
  }

  /** @return {SplitViewMaster} */
  get master () {
    return /** @type {SplitViewMaster} */ (this.select('ark-splitview-master'))
  }

  /** @return {SplitViewDetail} */
  get detail () {
    return /** @type {SplitViewDetail} */ (this.select('ark-splitview-detail'))
  }

  /** @param {CustomEvent} event */
  _onMasterChange (event) {
    event.stopImmediatePropagation()

    const context = event.detail || {}
    this.renderDetail(context)

    this.dispatchEvent(new CustomEvent('detail:change', event))
  }
}
customElements.define('ark-splitview', SplitView)
