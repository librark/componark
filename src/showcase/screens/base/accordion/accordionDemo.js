import { Component } from '../../loader'

export class AccordionDemo extends Component {
	init (context) {
		return super.init(context)
	}

	render () {
		this.innerHTML = /* html */ `${this.styles}
      <ark-accordion>
        <ark-accordion-tab header="tab 1" >
          <span>content tab 1</span>
        </ark-accordion-tab>
        <ark-accordion-tab header="tab 2">
          <span>content tab 2</span>
        </ark-accordion-tab>
        <ark-accordion-tab header="tab 3">
          <span>content tab 3</span>
        </ark-accordion-tab>
        <ark-accordion-tab header="tab 4" disabled>
          <span>content tab 4</span>
        </ark-accordion-tab>
      </ark-accordion>

      <br/>
      <hr/>
      <h1>multiple</h1>


      <ark-accordion multiple>
        <ark-accordion-tab header="tab A" >
          <span>content tab A</span>
        </ark-accordion-tab>
        <ark-accordion-tab header="tab B">
          <span>content tab B</span>
        </ark-accordion-tab>
        <ark-accordion-tab header="tab C">
          <span>content tab C</span>
        </ark-accordion-tab>
        <ark-accordion-tab header="tab D" disabled>
          <span>content tab D</span>
        </ark-accordion-tab>
      </ark-accordion>

    `
		return super.render()
	}

	get styles () {
		return /* html */ `
      <style>
        demo-accordion{
          padding: 1rem;
          display: block;
        }
      </style>
    `
	}
}
customElements.define('demo-accordion', AccordionDemo)
