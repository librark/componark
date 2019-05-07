export class AccordionTab extends HTMLElement {
  init (context) {
    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    if (!this.header) {
      this.innerHTML = ''
      return
    }

    this.innerHTML = /* html */`
      <button class="ark-accordion-tab__btn-header">
        ${this.header}
      </button>
      <div id="ark-accordion-tab__content">
        ${this.innerHTML}
      </div>
    `

    this._listen()
  }

  _listen () {
    this.querySelector('.ark-accordion-tab__btn-header').addEventListener(
      'click', () => { this.toggle() }
    )
  }

  open () {
    this.querySelector('#ark-accordion-tab__content').classList.add(
      `ark-accordion-tab--show`
    )
  }

  close () {
    this.querySelector('#ark-accordion-tab__content').classList.remove(
      `ark-accordion-tab--show`
    )
  }

  toggle () {
    this.querySelector('#ark-accordion-tab__content').classList.toggle(
      `ark-accordion-tab--show`
    )
  }

  // ---------------------------------------------------------------------------

  get header () {
    return this.getAttribute('header') || null
  }
}
customElements.define('ark-accordion-tab', AccordionTab)
