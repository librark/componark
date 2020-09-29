import { Component } from 'components/component'

export class TabsItem extends Component {
  init (context = {}) {
    this.title = context.title

    // local variables
    this.defaultContent = this.defaultContent || this.innerHTML
    return super.init()
  }

  reflectedProperties () {
    return ['title', 'tab']
  }

  render () {
    this.innerHTML = /* html */ `
      <${this._getType()}>
        ${this.defaultContent}
        <span>${this.title}</span>
      </${this._getType()}>
    `
    return super.render()
  }

  _getType () {
    return this.hasAttribute('href') ? 'a' : 'button'
  }
}
customElements.define('ark-tabs-item', TabsItem)
