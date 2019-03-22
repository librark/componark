// @ts-ignore
import Image from './assets/building.jpg'

export class CardDemo extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
    <div class="demo-card">
        <p>Card:</p>
        <hr/><br/>

        <ark-card>
          <ark-card-header>
            <ark-card-header-title>Header Title</ark-card-header-title>
            <ark-card-header-subtitle>SubTitle</ark-card-header-subtitle>
          </ark-card-header>
          <ark-card-image src=${Image} width="300px"></ark-card-image>
          <ark-card-content>
            This is the content.<h6>Hola mundo</h6>
          </ark-card-content>
        </ark-card>

    </div>
    `
  }
}
customElements.define('demo-card', CardDemo)
