/**
 * @typedef {import('../../loader').Table} Table
 **/
import { Component } from '../../loader'

export class TabsDemo extends Component {
	init (context) {
		return super.init(context)
	}

	render () {
		this.innerHTML = /* html */`
      <div>
        <p>This is a tabs.</p>
      </div>

      <ark-tabs>
        <ark-tabs-item title="tab 1">
          <ark-icon name="far fa-address-book"></ark-icon>
        </ark-tabs-item>
        <ark-tabs-item title="tab 2">
          <ark-icon name="far fa-address-book"></ark-icon>
        </ark-tabs-item>
        <ark-tabs-item title="tab 3">
          <ark-icon name="far fa-address-book"></ark-icon>
        </ark-tabs-item>
        <ark-tabs-item title="tab 4">
          <ark-icon name="far fa-address-book"></ark-icon>
        </ark-tabs-item>
        <ark-tabs-item title="tab 5">
          <ark-icon name="far fa-address-book"></ark-icon>
        </ark-tabs-item>
        <ark-tabs-item title="tab 6">
          <ark-icon name="far fa-address-book"></ark-icon>
        </ark-tabs-item>
      </ark-tabs>
    `

		return super.render()
	}
}
customElements.define('demo-tabs', TabsDemo)
