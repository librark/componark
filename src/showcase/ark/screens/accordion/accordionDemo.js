export class AccordionDemo extends HTMLElement {
  connectedCallback () {
    this.root = this
    this.render()
  }

  render () {
    this.root.innerHTML = /* html */`
        <div class="demo-accordion">
            <p>This is an accordion with header</p>
            <ark-accordion>
                <ark-accordion-tab slot="first" header="SECOND">
                </ark-accordion-tab>
                <ark-accordion-tab slot="first" header="FIRST">
                </ark-accordion-tab>
            </ark-accordion>
        </div>
        `
  }
}
customElements.define('demo-accordion', AccordionDemo)
