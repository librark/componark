// @ts-ignore
import '../../../../components/icon'

export class IconDemo extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
      <p>Icon:</p>
      <hr/><br/>
      <div>
        <span>fas fa-address-book</span>
        <p style="font-size: 100px; margin: 10px auto;" >
          <ark-icon name="fa-address-book"></ark-icon>
        </p>
      </div>
      <div>
        <span>far fa-address-book</span>
        <p style="font-size: 100px; margin: 10px auto;" >
          <ark-icon name="fa-address-book" type="far"></ark-icon>
        </p>
      </div>
    `
  }
}
customElements.define('demo-icon', IconDemo)
