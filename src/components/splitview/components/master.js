import { Component } from '../../component'

export class SplitviewMaster extends Component {
  init (context) {
    this.masterEvent = this.masterEvent

    this.firstElementChild.addEventListener(
      this.masterEvent, this._onMasterEvent.bind(this))
    return super.init(context)
  }

  reflectedProperties () {
    return ['masterEvent']
  }

  render () {
    return super.render()
  }

  _onMasterEvent (event) {
    this.dispatchEvent(new CustomEvent('master:change', event))
  }
}
customElements.define('ark-splitview-master', SplitviewMaster)
