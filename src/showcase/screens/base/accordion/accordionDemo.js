import { Component } from '../../../../components/component'

export class AccordionDemo extends Component {
	init (context) {
		this.type = context['type'] || 'ark'
		return super.init(context)
	}

	render () {
		this.innerHTML = /* html */`
      <ark-accordion close-others>
        <ark-accordion-tab header="tab 1" >
          <span>content tab 1</span>
        </ark-accordion-tab>
        <ark-accordion-tab header="tab 2">
          <span>content tab 2</span>
        </ark-accordion-tab>
        <ark-accordion-tab header="tab 3">
          <span>content tab 3</span>
        </ark-accordion-tab>
      </ark-accordion>
    `
		return super.render()
	}
}
customElements.define('demo-accordion', AccordionDemo)
