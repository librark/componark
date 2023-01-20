import { Component } from '../../../base/component/index.js'

const tag = 'ark-splitview-master'
export class SplitViewMaster extends Component {
  constructor () {
    super()
    this.addEventListener(
      this['masterEvent'], this.onMasterEvent.bind(this))
  }
  
  init(context = {}) {
    this.binding = 'splitview-master-listen'
    return super.init(context)
  }

  reflectedProperties () {
    return ['masterEvent']
  }

  /** @param {CustomEvent} event */
  onMasterEvent (event) {
    event.stopPropagation()
    this.emit('master-change', event.detail)
  }
}
Component.define(tag, SplitViewMaster)
