import { Component } from 'base/component'

const tag = 'ark-splitview-master'
export class SplitViewMaster extends Component {

  reflectedProperties () {
    return ['masterEvent']
  }

  render () {
    if (this.firstElementChild) {
      this.firstElementChild.addEventListener(
        this['masterEvent'], this._onMasterEvent.bind(this)
      )
    }
    return super.render()
  }

  _onMasterEvent (event) {
    event.stopPropagation()
    this.emit('master:change', event.detail)
  }
}
Component.define(tag, SplitViewMaster)
