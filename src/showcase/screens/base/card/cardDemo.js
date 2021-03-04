import { Component } from 'base/component'
// @ts-ignore
import Image from './assets/building.jpg'

export class CardDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `
      <ark-card title="Title" subtitle="subtitle [Hello World]">
        <img slot="media" src="${Image}" alt="" />

        <div>
          body
        </div>

        <ark-button background="secondary" color="dark" slot="actions">btn 1</ark-button>
        <ark-button background="dark" slot="actions">btn 2</ark-button>
      </ark-card>

      <hr/>

      <ark-card title="titulo" subtitle="subtitle [Hello World]" no-border>
        <img slot="media" src="${Image}" alt="" />

        <div>
          body
        </div>

        <ark-button background="secondary" color="dark" slot="actions">btn 1</ark-button>
        <ark-button background="dark" slot="actions">btn 2</ark-button>
      </ark-card>

      <br/>

      <a href="https://github.com/knowark/componark/blob/master/src/components/card/README.rst">
      * Reference
      </a>
    `

    return super.render()
  }

  get card () {
    return this.select('ark-card')
  }
}
Component.define('demo-card', CardDemo)
