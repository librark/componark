/**
 * @typedef {import('./detail.js').SplitviewDetail} SplitviewDetail
 * @typedef {import('./master.js').SplitviewMaster} SplitviewMaster
 **/

import './master'
import './detail'

import { Component } from '../../component'

export class Splitview extends Component {
  init (context) {
    this.detailTemplate = context['detailTemplate']
    this.title = context['title'] || this.title || ''

    return super.init(context)
  }

  render () {
    if (this.master && this.detailTemplate) {
      this.innerHTML = /* html */`
        <div class="master-container">
          ${this.innerHTML}
        </div>
        <ark-splitview-detail></ark-splitview-detail>
      `

      this._listenMaster()
      this._initSplitviewDetail()
    }
    return super.render()
  }

  /** @return {SplitviewMaster} */
  get master () {
    return /** @type {SplitviewMaster} */ (this.select('ark-splitview-master'))
  }

  /** @return {SplitviewDetail} */
  get detail () {
    return /** @type {SplitviewDetail} */ (this.select('ark-splitview-detail'))
  }

  // ---------------------------------------------------------------------------
  /** @argument {Event} event */
  _onMasterChange (event) {
    event.stopImmediatePropagation()
    const item = event['detail'] ? event['detail']['item'] : {}
    this.detail.init({ item: item }).render()
  }

  _listenMaster () {
    this.master.setAttribute('listen', 'listen')
    this.master.setAttribute('on-master:change', '_onMasterChange')
  }

  _initSplitviewDetail () {
    this.detail.init({
      template: this.detailTemplate,
      title: this.title
    })
    this.detail.connectedCallback()
  }
}
customElements.define('ark-splitview', Splitview)
