import { Component } from 'base/component/index.js'
// @ts-ignore
import Image from './assets/building.jpg'

export class CardDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.content = /* html */ `

    <div class="row padding-normal roundness-normal shadow-normal background-primary"
      style="width: 300px; height: 150px;">
      <div class="center">ONE</div>
      <div class="center">TWO</div>
      <div class="center">TWO</div>
      <div class="center">TWO</div>
      <div class="center">TWO</div>

      <div class="center">ONE</div>
      <div class="center">TWO</div>
      <div class="center">TWO</div>
      <div class="center">TWO</div>
      <div class="center">TWO</div>
    </div>

    <div class="column padding-normal roundness-normal shadow-normal background-primary"
      style="width: 300px; height: 150px;">
      <div class="center">ONE</div>
      <div class="center">TWO</div>
      <div class="center">TWO</div>
      <div class="center">TWO</div>
      <div class="center">TWO</div>
    </div>

    <div class="row padding-normal roundness-normal background-primary filter-hover drop-shadow-high"
      style="width: 300px; height: 150px;">
      <div class="column background-muted">
        <div class="circular center background-danger" style="width: 50px; height: 50px;"></div>
      </div>
      <div class="column background-light column-span-huge" >
        <div class="flex-center flex-justify-start bold uppercase background-danger
        row-span-normal filter-hover contrast-high drop-shadow-normal
        padding-large">
          <span>Chao</span><span class="padding-left-normal">Hola</span>
        </div>
        <div class="center">ONE</div>
        <div class="center">TWO</div>
      </div>
    </div>

    <br>
    <br>
    <br>
    <br>

    <ark-card animated 
      background="primary" 
      title="CARD TITLE" 
      subtitle="subtitle card"
      header-align="center"
      align-all="center"
    >
      <img slot="media" src="${Image}" alt="" />

      <div class="background-success backdrop-filter invert-high">
        Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Alias harum ea inventore 
        iure autem porro debitis provident architecto accusantium id?
      </div>


      <ark-button fab slot="actions" background="light" color="dark" size="medium">
        <ark-icon slot='icon' name="fas fa-address-book"></ark-icon>
      </ark-button>

    </ark-card>

    <p class="filter-hover blur-low">HOLA MUNDO</p>

    <button class="filter-active cursor-pointer brightness-high background-danger color-success">FILTER MUNDO</button>

    <p class="shadow-tiny background-secondary">SHADOWS</p>

    <ark-card no-borders title="Borderless card" subtitle="subtitle card">
      <div class="bold italic outline-solid outline-huge outline-success
        border-left-solid border-right-dashed border-primary border-normal 
        container color-light background-danger
        filter-hover brightness-high line-large hue-rotate-high invert-low">

        Lorem ipsum dolor sit, amet consectetur 
        adipisicing elit. Alias harum ea inventore 
        iure autem porro debitis provident architecto accusantium id?
      </div>
    </ark-card>
    


      <hr/>

      <ark-card title="titulo" subtitle="subtitle [Hello World]" no-border>

        <div>
          body
        </div>

        <ark-button background="secondary" color="dark" slot="actions">btn 1</ark-button>
        <ark-button background="dark" slot="actions">btn 2</ark-button>
      </ark-card>

      <br/>

      <a
        target="_demo" 
        href="https://github.com/knowark/componark/blob/master/lib/components/card/README.md">
      * Reference
      </a>
    `

    return super.render()
  }

  get card() {
    return this.select('ark-card')
  }
}

const styles = /* css */ `
  .demo-card {
    display: grid;
    justify-items: center;
    gap: 1rem;
  }
  .ark-card {
    min-width: 300px;
    max-width: 50%
  }
`
Component.define('demo-card', CardDemo, styles)
