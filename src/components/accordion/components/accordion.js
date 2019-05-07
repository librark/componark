export * from './accordion.tab.js'

export class Accordion extends HTMLElement {
  init (context) {
    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`${this.innerHTML}`
    this._listen()
  }

  _listen () {
    if (this._closeOthers) {
      const items = Array.from(this.querySelectorAll('ark-accordion-tab'))

      items.forEach((item, i) => {
        item.querySelector('.ark-accordion-tab__btn-header').onclick = () => {
          items.forEach((aux, a) => {
            if (i !== a) {
              // aux.close()
              aux.querySelector('#ark-accordion-tab__content').classList.remove(
                `ark-accordion-tab--show`
              )
            }
          })
        }
      })
    }
  }

  get _closeOthers () {
    const att = this.getAttributeNode('closeOthers')
    return att ? !(att.value === 'false') : true
  }
}
customElements.define('ark-accordion', Accordion)
