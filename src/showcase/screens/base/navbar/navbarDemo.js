import { Component } from '../../loader'

export class NavbarDemo extends Component {
	init (context) {
		this.type = context['type'] || 'ark'
		return super.init(context)
	}

	render () {
		this.innerHTML = /* html */ `

      <ark-navbar fixed-top>
        <ark-nav justify="between">
          <div>
            <ark-button>
                <ark-icon name="fas fa-bars"></ark-icon>
            </ark-button>
            <ark-button>x_Item 1-1</ark-button>
          </div>
          <div>
            <ark-button ark-navbar-hide-large>
              |CUENTA ABC|
            </ark-button>
            <ark-button ark-navbar-toggle>
              <ark-icon name="fas fa-caret-down"></ark-icon>
            </ark-button>
          </div>
        </ark-nav>

        <ark-nav justify="center">
          <ark-button>x_Item 2-4</ark-button>
          <ark-button>x_Item 2-4</ark-button>
        </ark-nav>

        <ark-nav justify="end">
          <ark-button ark-navbar-hide-small>
              |CUENTA 123|
          </ark-button>
          <ark-button>x_Item 3-8</ark-button>
          <ark-button>x_Item 3-9</ark-button>
        </ark-nav>
      </ark-navbar>

      <!-- DOCUMENTATION -->

      <div>
        <h3>ark-navbar</h3>
        <small>Attributes:</small>
        <p>fixed-top</p>
        <hr/>
        <small>Justify:</small>
        <p>center</p>
        <p>end</p>
        <p>between</p>
      </div>
      <div>
        <h3>ark-nav</h3>
        <small>Attributes:</small>
        <p>data-ark-navbar-toggle</p>
      </div>
    `

		return super.render()
	}
}
customElements.define('demo-navbar', NavbarDemo)
