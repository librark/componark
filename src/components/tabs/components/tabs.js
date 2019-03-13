export class Tabs extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this._autoActiveElement()
    this._listen()
  }

  _listen () {
    const items = Array.from(this.querySelectorAll('ark-tabs-item'))
    items.forEach(i => i.addEventListener('click', _ =>
      this._activeElement(i.firstElementChild))
    )
  }

  _activeElement (element) {
    const items = Array.from(this.querySelectorAll('ark-tabs-item'))
    items.forEach(i => i.firstElementChild.removeAttribute('active'))

    const att = document.createAttribute('active')
    element.setAttributeNode(att)
  }

  _autoActiveElement () {
    const items = Array.from(this.querySelectorAll('ark-tabs-item'))
    var isActive = false
    items.forEach(i => {
      const att = Array.from(i.attributes)
      isActive = isActive ? true : att.filter(a => a.name === 'active').length
    })
    if (!isActive) this._activeElement(items[0])
  }
}
customElements.define('ark-tabs', Tabs)
