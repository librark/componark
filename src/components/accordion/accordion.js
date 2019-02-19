
export class Accordion extends HTMLElement {
  connectedCallback () {
    this.root = this
    this.render()
  }

  render () {
    this.root.innerHTML = /* html */`
      <div class="ark-accordion">
        <p>ARK ACCORDION</p>
      </div>
      `
  }
}
customElements.define('ark-accordion', Accordion)
