/**
 * @typedef {import('./detail.js').SplitviewDetail} SplitviewDetail
 * @typedef {import('./master.js').SplitviewMaster} SplitviewMaster
 **/
import { Component } from '../../component'
import { SplitviewDetail } from './detail'
import { SplitviewMaster } from './master'

export class Splitview extends Component {
  init (context) {
    this.masterTemplate = context['masterTemplate']
    this.detailTemplate = context['detailTemplate']
    this.masterEvent = context['masterEvent'] || this.masterEvent
    return super.init(context)
  }

  reflectedProperties () {
    return ['masterEvent']
  }

  render () {
    if (this.masterTemplate && this.detailTemplate) {
      this.innerHTML = /* html */ ``
      this.append(this._newSplitviewMaster())
      this.append(this._newSplitviewDetail())
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
  _onMasterChange (event) {
    const item = event.detail ? event.detail.item : {}
    this.detail.init({ item: item }).render()
  }

  /** @return {SplitviewMaster} */
  _newSplitviewMaster () {
    const master = new SplitviewMaster()
    master.setAttribute('master-event', this.masterEvent)
    master.setAttribute('listen', 'listen')
    master.setAttribute('on-master:change', '_onMasterChange')
    master.init({ template: this.masterTemplate })
    master.connectedCallback()
    return master
  }

  /** @return {SplitviewDetail} */
  _newSplitviewDetail () {
    const detail = new SplitviewDetail()
    detail.init({ template: this.detailTemplate })
    detail.connectedCallback()
    return detail
  }
}
customElements.define('ark-splitview', Splitview)
