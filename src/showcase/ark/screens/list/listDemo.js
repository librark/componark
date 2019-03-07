import '../../../../components/list'
import '../../../../components/icon'

export class ListDemo extends HTMLElement {
  connectedCallback () {
    this.render()
  }
  render () {
    this.innerHTML = /* html */`
      <p>list item</p>
      <div style="width: 300px;">
        <ark-list>
          <ark-item>
            <span>fa-address-book</span>
            <div slot="start">
              <ark-icon name="fa-address-book"></ark-icon>
            </div>
            <div slot="end">1</div>
            <div slot="end">2</div>
            <div slot="end">3</div>
            <div slot="end">4</div>
          </ark-item>
          <ark-item>
            <div>fa-address-book</div>
            <div slot="start">
              <ark-icon name="fa-address-book" type="far"></ark-icon>
            </div>
            <div slot="end">far</div>
          </ark-item>
        </ark-list>

        <ark-list>
          <ark-item>
            <div>fa-address-book</div>
            <div slot="end">
              <ark-icon name="fa-address-book"></ark-icon>
            </div>
          </ark-item>
          <ark-item>
            <div>fa-address-book</div>
            <div slot="end">
              <ark-icon name="fa-address-book" type="far"></ark-icon>
            </div>
          </ark-item>
        </ark-list>
      </div>
    `
  }
}
customElements.define('demo-list', ListDemo)
