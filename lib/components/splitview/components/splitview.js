import { Component, css } from "#base/index.js"

/** @import {SplitViewDetail} from './splitview.detail.js' */

const tag = 'ark-splitview'
export class SplitView extends Component {
  constructor () {
    super()
    this.binding = 'splitview-listen'
    this._onResize = this.setDimensions.bind(this)
    this._onMasterChange = this.onMasterChange.bind(this)
    this._master = null
  }

  setDimensions () {
    if (typeof globalThis.innerHeight !== 'number') return
    if (typeof globalThis.innerWidth !== 'number') return

    this.style.setProperty('--inner-height', `${globalThis.innerHeight}px`)
    this.style.setProperty('--inner-width', `${globalThis.innerWidth}px`)
  }

  connectedCallback () {
    this.setDimensions()
    globalThis.addEventListener('resize', this._onResize)
    super.connectedCallback()
  }

  disconnectedCallback () {
    globalThis.removeEventListener('resize', this._onResize)
    this._removeMasterListener()
    super.disconnectedCallback()
  }

  _setMasterListener () {
    const master = this.master
    if (master === this._master) return

    this._removeMasterListener()
    this._master = master
    this._master?.addEventListener('master-change', this._onMasterChange)
  }

  _removeMasterListener () {
    if (!this._master) return
    this._master.removeEventListener('master-change', this._onMasterChange)
    this._master = null
  }

  get master () {
    return this.select('ark-splitview-master')
  }

  get detail () {
    return /** @type {SplitViewDetail} */ (this.select('ark-splitview-detail'))
  }

  render () {
    this.renderDetail()
    this._setMasterListener()
    return super.render()
  }

  /** @param {Object} context */
  renderDetail (context = {}) {
    if (!this.detail || !this.detail.init) return

    this.detail.init(context).render()
  }

  /** @param {CustomEvent} event */
  onMasterChange (event) {
    event.stopPropagation()

    const context = event.detail
    this.renderDetail(context)
    this.detail.show()

    this.emit('detail-change', context)
  }
}

const styles = css`
@media (max-width: 960px) {
  .ark-splitview-detail {
    position: fixed;
    overflow: auto;
    inset: 0 auto auto 0;
    height: var(--inner-height, 100vh);
    width: var(--inner-width, 100vh); ;
  }

  .ark-splitview-detail[hidden] {
    display: none;
  }
}
`

Component.define(tag, SplitView, styles)
