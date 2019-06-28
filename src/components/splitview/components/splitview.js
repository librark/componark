import { Component } from '../../component'
import './master.js'
import './detail.js'

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
    console.log('master event>>>', this.masterEvent)
    if (this.masterTemplate && this.detailTemplate) {
      this.innerHTML = /* html */`
        <ark-splitview-master master-event=${this.masterEvent}
          listen on-master:change="_onMasterChange">
            ${this._renderMaster()}
        </ark-splitview-master>
        <ark-splitview-detail>
            ${this._renderDetail()}
        </ark-splitview-detail>
        `
    }
    return super.render()
  }

  get master () {
    const master = this.querySelector('ark-splitview-master')
    return master ? master.firstElementChild : null
  }

  get detail () {
    const detail = this.querySelector('ark-splitview-detail')
    return detail ? detail.firstElementChild : null
  }

  _renderMaster () {
    return this.masterTemplate()
  }

  _renderDetail () {
    return this.detailTemplate()
  }

  _onMasterChange (event) {
    console.log('E:::', event)
  }
}
customElements.define('ark-splitview', Splitview)
