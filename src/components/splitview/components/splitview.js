/**
 * @typedef {import('./detail.js').SplitviewDetail} SplitviewDetail
 * @typedef {import('./master.js').SplitviewMaster} SplitviewMaster
 **/

import './master'

import { Component } from '../../component'
import { SplitviewDetail } from './detail'

export class Splitview extends Component {
  init (context) {
    this.detailTitle = context['title']
    this.detailTemplate = context['detailTemplate']
    this.detailDefaultTemplate = context['defaultTemplate']
    this.detailBackButtonIcon = context['backButtonIcon']

    return super.init(context)
  }

  render () {
    if (this.master && this.detailTemplate) {
      this.innerHTML = /* html */`
        <div class="master-container">
          ${this.innerHTML}
        </div>
      `
      this._listenMaster()
      this.append(this._splitviewDetail())
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
    const item = event['detail'] ? event['detail']['item'] : null
    this.detail.init({ item: item }).render()
  }

  _listenMaster () {
    this.master.setAttribute('listen', 'listen')
    this.master.setAttribute('on-master:change', '_onMasterChange')
  }

  _splitviewDetail () {
    const detail = new SplitviewDetail()
    detail.init({
      template: this.detailTemplate,
      title: this.detailTitle || '',
      defaultTemplate: this.detailDefaultTemplate,
      backButtonIcon: this.detailBackButtonIcon
    }).connectedCallback()
    return detail
  }
}
customElements.define('ark-splitview', Splitview)
