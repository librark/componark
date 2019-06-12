export class Grid extends HTMLElement {
  init (context) {
    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.elementStyle()
  }

  elementStyle () {
    this.style.display = 'grid'

    this.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`
    this.style.gridTemplateRows = `1fr`

    this.style.gridGap = `${this.gap}`
    this.style.padding = `${this.gap}`
  }

  // ---------------------------------------------------------------------
  get cols () {
    return this.getAttribute('cols') || 0
  }

  get gap () {
    return this.getAttribute('gap') || '5px'
  }
}
customElements.define('ark-grid', Grid)
