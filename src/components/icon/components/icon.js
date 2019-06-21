import { Component } from '../../component'

export class Icon extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.type = this.getAttribute('type') || 'aws'
    this.name = this.getAttribute('name') || 'fas cloud'

    if (this.type === 'aws') {
      this.innerHTML = this._renderFontawesome()
    }

    return super.render()
  }

  _renderFontawesome () {
    return /* html */ `<i class="${this.name}"></i>`
  }
}
customElements.define('ark-icon', Icon)
