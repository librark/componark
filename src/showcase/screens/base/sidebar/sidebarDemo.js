/**
 * @typedef {import('../../loader').Sidebar} Sidebar
 **/
import { Component } from '../../loader'

export class SidebarDemo extends Component {
	init (context) {
		return super.init(context)
	}

	render () {
		this.innerHTML = /* html */`
      <div>
        <p>This is a sidebar.</p>
        <ark-button listen on-click="_onClick" background="primary">
          OPEN
        </ark-button>
      </div>


      <ark-sidebar>
        <div slot="header">Menu</div>
        <div>body</div>
        <div slot="footer">footer</div>
      </ark-sidebar>
    `

		return super.render()
	}

	_onClick () {
		const sidebar = /** @type {Sidebar} */ (this.querySelector('ark-sidebar'))
		sidebar.open()
	}
}
customElements.define('demo-sidebar', SidebarDemo)
