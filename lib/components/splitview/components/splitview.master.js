import { Component } from "#base/index.js"

const tag = 'ark-splitview-master'
/**
 * Master pane controller for split-view layout.
 */
export class SplitViewMaster extends Component {
  constructor () {
    super()
    this._onMasterEvent = this.onMasterEvent.bind(this)
    this._boundMasterEvent = null
    this.masterEvent = this.masterEvent
  }

  /** @param {object} context
   *  @returns {this} */
  init (context = {}) {
    this.binding = 'splitview-master-listen'
    return super.init(context)
  }

  /** @returns {string[]} */
  reflectedProperties () {
    return ['masterEvent']
  }

  /** @returns {void} */
  connectedCallback () {
    this._syncMasterEventListener()
    super.connectedCallback()
  }

  /** @returns {void} */
  disconnectedCallback () {
    this._removeMasterEventListener()
    super.disconnectedCallback()
  }

  /** @returns {void} */
  _syncMasterEventListener () {
    const masterEvent = (this.masterEvent || '').trim()
    if (!masterEvent || masterEvent === this._boundMasterEvent) return

    this._removeMasterEventListener()
    this.addEventListener(masterEvent, this._onMasterEvent)
    this._boundMasterEvent = masterEvent
  }

  /** @returns {void} */
  _removeMasterEventListener () {
    if (!this._boundMasterEvent) return
    this.removeEventListener(this._boundMasterEvent, this._onMasterEvent)
    this._boundMasterEvent = null
  }

  /** @param {CustomEvent} event */
  onMasterEvent (event) {
    event.stopPropagation()
    this.emit('master-change', event.detail)
  }
}
Component.define(tag, SplitViewMaster)
