import { Component, css } from '../../../base/component/index.js'

const tag = 'ark-splitview'
export class SplitView extends Component {
  constructor() {
    super()
    this.binding = 'splitview-listen'
    this.setDimensions()
    globalThis.addEventListener('resize', this.setDimensions.bind(this))
  }

  setDimensions() {
    this.style.setProperty('--inner-height', `${innerHeight}px`)
    this.style.setProperty('--inner-width', `${innerWidth}px`)
  }

  get master () {
    return this.select('ark-splitview-master')
  }

  get detail () {
    return this.select('ark-splitview-detail')
  }

  render () {
    this.renderDetail()
    if (this.master) {
      this.master.addEventListener(
        'master-change', this.onMasterChange.bind(this))
    }
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
    this.detail["show"]()

    this.emit('detail-change', context)
  }
}

const styles = css`
@media (max-width: 960px) {
  .ark-splitview-detail {
    background: green;
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
