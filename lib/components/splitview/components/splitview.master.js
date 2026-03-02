import { Component } from "#base/index.js"

const tag = 'ark-splitview-master'
export class SplitViewMaster extends Component {
  constructor () {
    super()
    this._onMasterEvent = this.onMasterEvent.bind(this)
    this._boundMasterEvent = null
    this.masterEvent = this.masterEvent
  }

  init (context = {}) {
    this.binding = 'splitview-master-listen'
    return super.init(context)
  }

  reflectedProperties () {
    return ['masterEvent']
  }

  connectedCallback () {
    this._syncMasterEventListener()
    super.connectedCallback()
  }

  disconnectedCallback () {
    this._removeMasterEventListener()
    super.disconnectedCallback()
  }

  _syncMasterEventListener () {
    const masterEvent = (this.masterEvent || '').trim()
    if (!masterEvent || masterEvent === this._boundMasterEvent) return

    this._removeMasterEventListener()
    this.addEventListener(masterEvent, this._onMasterEvent)
    this._boundMasterEvent = masterEvent
  }

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
