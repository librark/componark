import { Component } from 'base/component'
import { styles } from '../styles'

const tag = 'ark-splitview'
export class SplitView extends Component {
  init (context = {}) {
    this.detailTitle = context.title || this.detailTitle

    this.detailBackButtonIcon = context.backButtonIcon ||
      this.detailBackButtonIcon

    
    return super.init()
  }

  render () {
    this.renderDetail()
    if (this.master) {
      this.master.addEventListener(
        'master:change', this._onMasterChange.bind(this))
    }
    return super.render()
  }

  /** @param {Object} context */
  renderDetail (context = {}) {
    if (!this.detail || !this.detail.init) return

    context['title'] = (
      context.title || this.detailTitle
    )

    context['backButtonIcon'] = (
      context.backButtonIcon || this.detailBackButtonIcon
    )

    this.detail.init(context).render()
    this.detail['show']()
  }

  get master () {
    return this.select('ark-splitview-master')
  }

  get detail () {
    return this.select('ark-splitview-detail')
  }

  /** @param {CustomEvent} event */
  _onMasterChange (event) {
    event.stopPropagation()

    const context = event.detail || {}
    this.renderDetail(context)

    this.emit('detail:change', context)
  }
}
Component.define(tag, SplitView, styles)
