import { Component } from '../../loader'
// @ts-ignore
import Image from './assets/building.jpg'

export class CardDemo extends Component {
	init (context) {
		return super.init(context)
	}

	render () {
		this.innerHTML = /* html */ `${this.styles}
      <ark-card title="titulo" subtitle="subtitle [Hello World]">
        <img slot="media" src="${Image}" alt="" />

        <div>
          body
        </div>

        <ark-button slot="action">btn 1</ark-button>
        <ark-button slot="action">btn 2</ark-button>
      </ark-card>

      <hr/>

      <ark-card title="titulo" subtitle="subtitle [Hello World]" no-border>
        <img slot="media" src="${Image}" alt="" />

        <div>
          body
        </div>

        <ark-button slot="action">btn 1</ark-button>
        <ark-button slot="action">btn 2</ark-button>
      </ark-card>

      <br/>
    `
		return super.render()
	}

	get styles () {
		return /* html */`
      <style>
        demo-card{
          display: block;
          padding: 15px;
        }
      </style>
    `
	}
}
customElements.define('demo-card', CardDemo)
