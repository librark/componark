import { Component } from '../loader'

export class RootContainerComponent extends Component {
	/** @param {{ component: Component }} context */
	init (context) {
		this.component = context['component']

		// -------------------------------------------------------------------------
		// Local
		// -------------------------------------------------------------------------
		this.currentLocation = window.location

		this.mobileWidth = '360px'
		this.tabletWidth = '768px'
		this.desktopWidth = '960px'

		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `${this.styles}
      <ark-grid class="container" gap="1rem">
        <ark-grid-item data-component></ark-grid-item>
        <ark-grid-item>
          <h3>Mobil ${this.mobileWidth}</h3>
          <iframe data-mobile></iframe>
        </ark-grid-item>
        <ark-grid-item>
          <h3>Tablet ${this.tabletWidth}</h3>
          <iframe data-tablet></iframe>
        </ark-grid-item>
        <ark-grid-item>
          <h3>Desktop ${this.desktopWidth}</h3>
          <iframe data-desktop></iframe>
        </ark-grid-item>
      </ark-grid>
    `

		return super.render()
	}

	load () {
		this.container = this.querySelector('[data-component]')
		if (this.container) this.container.append(this.component)

		this._loadComponent()

		return super.load()
	}

	_loadComponent () {
		const mobile = this.querySelector('[data-mobile]')
		const tablet = this.querySelector('[data-tablet]')
		const desktop = this.querySelector('[data-desktop]')

		this._setupFrame(mobile, this.mobileWidth)
		this._setupFrame(tablet, this.tabletWidth)
		this._setupFrame(desktop, this.desktopWidth)
	}

	_setupFrame (iframe, width) {
		iframe.setAttribute('frameborder', `1`)
		iframe.setAttribute('src', `${this.currentLocation.origin}/blank`)
		iframe.setAttribute('width', width)
		iframe.setAttribute('height', '568px')

		iframe.onload = () => {
			const content = iframe.contentWindow.document
			const body = content.querySelector('body')

			body.prepend(this.component.cloneNode(true))
		}
	}

	// ---------------------------------------------------------------------------
	get styles () {
		return /* html */`
      <style>
        app-root-container .container{
          padding: 1rem;
        }

        app-root-container .container iframe,
        app-root-container .container [data-component] {
          background: rgba(0, 0, 0, .1);
        }

        app-root-container ark-grid ark-grid-item{
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        app-root-container ark-grid [data-component]{
          width: 100%;
          height: 80vh;
          display: flex;
          align-items: baseline;
          overflow: auto;
        }
        app-root-container ark-grid [data-component] > *{
          display: block;

          width: inherit;
          height: inherit;

          max-width: -webkit-fill-available;
          max-height: -webkit-fill-available;
        }
      </style>
    `
	}
}
customElements.define('app-root-container', RootContainerComponent)
