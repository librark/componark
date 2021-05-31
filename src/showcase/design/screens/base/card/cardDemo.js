import { Component } from "base/component"
// @ts-ignore
import Image from "./assets/building.jpg"

export class CardDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `
      <ark-card round="xl" background="primary" title="CARD TITLE" subtitle="subtitle card">
        <img slot="media" src="${Image}" alt="" />

        <div>
          Lorem ipsum dolor sit, amet consectetur 
          adipisicing elit. Alias harum ea inventore 
          iure autem porro debitis provident architecto accusantium id?
        </div>

        <ark-button fab slot="actions"  background="light" color="dark" >
          <ark-icon slot='icon' name="fas fa-address-book"></ark-icon>
        </ark-button>

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

  get card() {
    return this.select("ark-card")
  }
}

const styles = /* css */ `
  :root{
    --primary: #1c1c3d;
  }
  .ark-card{
  min-width: 300px;
  max-width: 50%
  }
`
Component.define("demo-card", CardDemo, styles)
