import { Component } from '../../component'

export class Icon extends Component {
  init (context = {}) {
    this.type = this.type || 'awe'
    this.name = this.name || 'fas cloud'

    return super.init()
  }

  reflectedProperties () {
    return ['type', 'name']
  }

  render () {
    if (this.type === 'mat') {
      this.innerHTML = this._renderMaterial()
    } else {
      this.innerHTML = this._renderFontAwesome()
    }

    return super.render()
  }

  _renderFontAwesome () {
    return /* html */ `<i class="${this.name}"></i>`
  }

  _renderMaterial () {
    return /* html */ `<i class="material-icons">${this.name}</i>`
  }
}
customElements.define('ark-icon', Icon)
