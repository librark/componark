// @ts-ignore
import Image from './assets/building.jpg'
import '../../../../components/card'

export class CardDemo extends HTMLElement {
  connectedCallback () {
    this.root = this
    this.render()
  }

  render () {
    this.root.innerHTML = /* html */`
    <div class="demo-card">
        <p>Card:</p>
        <hr/><br/>
        <ark-card>
          <img src=${Image} width="400px"/>
          <p slot="header">Card Header</p>
          <p>This is general content.</p>
        </ark-card>
    </div>
    `
  }
}
customElements.define('demo-card', CardDemo)
