import '../../../../components/accordion'

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
                <ark-accordion-tab slot="tabs" header="TAB Header">
                </ark-accordion-tab>
            </ark-accordion>
        </div>
        `
  }
}
customElements.define('demo-accordion', AccordionDemo)
