export class Tabs extends HTMLElement {
  init (context) {
    return this
  }

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
      this._activeElement(i))
    )
  }

  _activeElement (element) {
    const items = Array.from(this.querySelectorAll('ark-tabs-item'))
    items.forEach(i => i.removeAttribute('active'))

    const att = document.createAttribute('active')
    element.setAttributeNode(att)
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
