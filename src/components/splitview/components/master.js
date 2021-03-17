import { Component } from '../../../base/component'

const tag = 'ark-splitview-master'
export class SplitViewMaster extends Component {
  constructor () {
    super()
    this.addEventListener(
      this['masterEvent'], this._onMasterEvent.bind(this))
  }

  init(context = {}) {
    this.binding = 'splitview-master:listen'
    return super.init(context)
  }

  reflectedProperties () {
    return ['masterEvent']
  }

  _onMasterEvent (event) {
    event.stopPropagation()
    this.emit('master:change', event.detail)
  }
}
Component.define(tag, SplitViewMaster)
