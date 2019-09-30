import { Component } from '../loader'

export class IconDemo extends Component {
	init (context) {
		this.type = context['type'] || 'ark'
		return super.init(context)
	}

	render () {
		this.innerHTML = /* html */`
      <p>Icon:</p>
      <hr/><br/>
      <div>
        <span>fas fa-address-book</span>
        <p style="font-size: 100px; margin: 10px auto;" >
          <ark-icon name="fas fa-address-book"></ark-icon>
        </p>
      </div>
      <div>
        <span>far fa-address-book</span>
        <p style="font-size: 100px; margin: 10px auto;" >
          <ark-icon name="far fa-address-book"></ark-icon>
        </p>
      </div>
    `

		return super.render()
	}
}
customElements.define('demo-icon', IconDemo)
