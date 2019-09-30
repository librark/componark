import { Component } from './loader'

/**
 * @typedef {import('./loader').List} List
 * @typedef {import('./loader').Sidebar} Sidebar
 * */

// @ts-ignore
// eslint-disable-next-line no-undef
export const version = VERSION

export class RootComponent extends Component {
	/** @param {{ path: string }} context */
	init (context) {
		this.path = context['path']
		this.urlActual = window.location

		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `${this.styles}
      <ark-navbar justify='between' fixed-top>
        <ark-nav>
          <div>
            <ark-button listen on-click='_onOpenSidebar'>
              <ark-icon name='fas fa-bars'></ark-icon>
            </ark-button>
            <span class='font-size' data-title>Componark</span>
          </div>
        </ark-nav>
      </ark-navbar>

      <ark-sidebar data-sidebar>
        <div slot='header' listen on-click='_onDashboard'>
          <strong>Componark</strong>
          <br/>
          <small>Versión: ${version}</small>
        </div>
        <ark-list listen on-list:selected='_onListItemSelected'
          data-sidebar-list default>
        </ark-list>
        <!-- <div slot='footer'></div> -->
      </ark-sidebar>

      <div class='root-content' data-root></div>
    `
		return super.render()
	}

	async load () {
		this._renderMenuList()
		return super.load()
	}

	// ---------------------------------------------------------------------------
	get sidebar () {
		return /** @type {Sidebar} */ (this.select('[data-sidebar]'))
	}

	get styles () {
		return /* html */`
      <style>
        app-root{
          display: block;
          height: 100vh;
        }
        app-root .root-content {
          height: calc(100vh - 64px);
          overflow: auto;
        }
        app-root .root-content > * {
          display: block;
          padding: 0;
          margin: 0;
        }
      </style>
    `
	}

	// ---------------------------------------------------------------------------
	_onOpenSidebar () {
		this.sidebar.open()
	}

	_closeSidebar () {
		this.sidebar.close()
	}

	async _renderMenuList () {
		const source = [
			{
				name: 'Accordion',
				path: `/base/accordion`
			},
			{
				name: 'Alert',
				path: `/base/alert`
			},
			{
				name: 'Button',
				path: `/base/button`
			},
			{
				name: 'Card',
				path: `/base/card`
			},
			{
				name: 'Chart',
				path: `/base/chart`
			},
			{
				name: 'Checkbox',
				path: `/base/checkbox`
			},
			{
				name: 'Grid',
				path: `/base/grid`
			},
			{
				name: 'Icon',
				path: `/base/icon`
			},
			{
				name: 'Input',
				path: `/base/input`
			},
			{
				name: 'List',
				path: `/base/list`
			},
			{
				name: 'Modal',
				path: `/base/modal`
			},
			{
				name: 'Navbar',
				path: `/base/navbar`
			},
			{
				name: 'Paginator',
				path: `/base/paginator`
			},
			{
				name: 'Radio',
				path: `/base/radio`
			},
			{
				name: 'Select',
				path: `/base/select`
			},
			{
				name: 'Sidebar',
				path: `/base/sidebar`
			},
			{
				name: 'Splitview',
				path: `/base/splitview`
			},
			{
				name: 'Table',
				path: `/base/table`
			},
			{
				name: 'Tabs',
				path: `/base/tabs`
			},
			{
				name: 'Zone',
				path: `/base/zone`
			}
		]

		this._updateLocation(source)

		const template = item => /* html */ `
      <span>${item['name']}</span>
    `

		const menuList = /** @type {List} */ (document.querySelector(
			'[data-sidebar-list]'
		))

		await menuList.init({ source: source, template: template }).render()
	}

	_updateLocation (source) {
		for (const p in source) {
			if (this.urlActual.pathname === source[p].path) {
				this.select('[data-title]').innerHTML = /* html */`
          ${source[p].name}
        `
			}
		}
	}

	_onDashboard () {
		this.select('[data-title]').innerHTML = /* html */`Componark`
		this._closeSidebar()
		return this.dispatchEvent(new CustomEvent('navigate', {
			bubbles: true,
			detail: { path: '/base/dashboard' }
		}))
	}

	/** @param {Event} event */
	_onListItemSelected (event) {
		this.select('[data-title]').innerHTML = /* html */`
      ${event['detail']['data']['name']}
    `
		this._closeSidebar()
		return this.dispatchEvent(new CustomEvent('navigate', {
			bubbles: true,
			detail: { path: event['detail']['data']['path'] }
		}))
	}

	/** @param {Component} component */
	setContentComponent (component) {
		const contentElement = super.select('[data-root]')
		while (contentElement.firstChild) contentElement.firstChild.remove()

		if (!component) return

		contentElement.appendChild(component)
	}
}
customElements.define('app-root', RootComponent)
