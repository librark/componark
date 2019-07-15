import { Component } from '../../component'

export class SplitviewMaster extends Component {
  init (context) {
    this.template = context['template'] || this.template || null
    this.masterEvent = this.masterEvent
    return super.init(context)
  }

  reflectedProperties () {
    return ['masterEvent']
  }

  render () {
    if (this.template) {
      this.innerHTML = this.template()
      this._listen()
    }
    return super.render()
  }

  _listen () {
    if (this.firstElementChild) {
      this.firstElementChild.addEventListener(
        this.masterEvent, this._onMasterEvent.bind(this)
      )
    }
  }

  _onMasterEvent (event) {
    this.dispatchEvent(new CustomEvent('master:change', event))
  }
}
customElements.define('ark-splitview-master', SplitviewMaster)
