export class NavbarDemo extends HTMLElement {
	init (context) {
		this.type = context['type'] || 'ark'
		return this
	}

	connectedCallback () {
		this.render()
	}

	render () {
		this.innerHTML = /* html */ `
      <div mobile><p>mobile (360px).</p></div>
      <div tablet><p>tablet (768px).</p></div>
      <div desktop><p>desktop (960px).</p></div>
      ${this._setupContent()}

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
		this._setupFrame('[mobile]', '360px')
		this._setupFrame('[tablet]', '768px')
		this._setupFrame('[desktop]', '960px')
	}

	_setupFrame (selector, width) {
		const content = this._setupContent()
		const frame = document.createElement('iframe')
		frame.setAttribute('src', `/${this.type}.html`)
		frame.setAttribute('frameborder', '1')
		frame.setAttribute('width', width)
		frame.setAttribute('height', '640px')
		frame.onload = () => {
			const frameBody = frame.contentDocument.querySelector('body')
			const app = frameBody.querySelector('app-showcase-ark')
			const main = document.createElement('main')
			main.innerHTML = content

			app.parentNode.removeChild(app)
			frameBody.prepend(main)
		}

		this.querySelector(selector).appendChild(frame)
	}

	_setupContent () {
		return /* html */ `
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
              |CUENTA|
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
              |CUENTA XXX|
          </ark-button>
          <ark-button>x_Item 3-8</ark-button>
          <ark-button>x_Item 3-9</ark-button>
        </ark-nav>
      </ark-navbar>
    `
	}
}
customElements.define('demo-navbar', NavbarDemo)
