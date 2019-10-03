import { Component } from '../../loader'
// @ts-ignore
import Image from './assets/building.jpg'

export class CardDemo extends Component {
	init (context) {
		this.type = context['type'] || 'ark'
		return super.init(context)
	}

	render () {
		this.innerHTML = /* html */ `
      <ark-card title="titulo" subtitle="subtitle [Hello World]">
        <img slot="media" src="${Image}" alt=""/>

        <div>
          body
        </div>

        <ark-button slot="action">btn 1</ark-button>
        <ark-button slot="action">btn 2</ark-button>
      </ark-card>
    `

		return super.render()
	}
}
customElements.define('demo-card', CardDemo)
