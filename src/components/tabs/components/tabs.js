import { Component } from '../../component'

export class Tabs extends Component {
  init (context) {
    return super.init()
  }

  render () {
    this._autoActiveElement()
    return super.render()
  }

  async load () {
    this.selectAll('ark-tabs-item').forEach(
      item => item.addEventListener('click', _ => this._activeElement(item))
    )
    return super.load()
  }

  _activeElement (element) {
    this.selectAll('ark-tabs-item').forEach(
      item => item.removeAttribute('active'))

    element.setAttribute('active', '')
  }

  _autoActiveElement () {
    const items = Array.from(this.querySelectorAll('ark-tabs-item'))
    var isActive = false
    items.forEach(i => {
      const att = Array.from(i.attributes).filter(a => a.name === 'active')
      if (att.length) isActive = true
    })
    if (!isActive) this._activeElement(items[0])
  }
}
customElements.define('ark-tabs', Tabs)
