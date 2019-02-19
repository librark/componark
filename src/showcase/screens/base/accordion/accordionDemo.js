import '../../../../components/accordion'

export class AccordionDemo extends HTMLElement {
  connectedCallback () {
    this.root = this
    this.render()
  }
  render () {
    this.root.innerHTML = /* html */`
        <div class="demo-accordion">
            <p>This is an accordion</p>
            <ark-accordion></ark-accordion>
        </div>
        `
  }
}
customElements.define('demo-accordion', AccordionDemo)
