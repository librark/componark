export class AccordionTab extends HTMLElement {
  connectedCallback () {
    this.root = this
    this.render()
  }

  render () {
    console.log('TAB RENDER!!!!!!!!!!!!')
    const header = this._renderHeader()

    this.root.innerHTML = /* html */`
    <div class="ark-accordion-tab">
        ${header}
        <p>ARK ACCORDION TAB</p>
    </div>
    `
  }

  _renderHeader () {
    return /* html */`
    <div class="ark-accordion-tab__header">
        <h1>${this.header}</h1>
    </div>
    `
  }

  get header () {
    return this.getAttribute('header')
  }

  set header (value) {
    this.setAttribute('header', value)
  }
}
customElements.define('ark-accordion-tab', AccordionTab)
