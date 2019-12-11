import './root.content.component'

import { Component } from '../loader'
import { importStyles } from '../theme'

/**
 * @typedef {import('../loader').List} List
 * @typedef {import('../loader').Sidebar} Sidebar
 * */

// @ts-ignore
// eslint-disable-next-line no-undef
export const version = VERSION

export class RootComponent extends Component {
  /** @param {{ path: String, currentStyle: String }} context */
  init (context) {
    this.path = context['path']
    this.currentStyle = context['currentStyle'] || 'material'

    // -------------------------------------------------------------------------
    // Local
    // -------------------------------------------------------------------------
    this.currentLocation = window.location

    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `${this.styles}
      <ark-navbar justify='between' fixed-top>
        <ark-nav>
          <div>
            <ark-button listen on-click='_onOpenSidebar' color="white">
              <ark-icon name='fas fa-bars'></ark-icon>
            </ark-button>
            <span class='font-size' data-page-name>Componark</span>
          </div>
        </ark-nav>
      </ark-navbar>

      <ark-sidebar data-sidebar>
        <div slot='header'>
          <strong>Componark</strong>
          <br/>
          <small>Versión: ${version}</small>
        </div>
        <ark-list listen on-list:selected='_onListItemSelected'
          data-sidebar-list default>
        </ark-list>
        <!-- <div slot='footer'></div> -->
      </ark-sidebar>

      <div class='root-content' data-root>
        <app-root-container data-root-container></app-root-container>
      </div>
    `
    return super.render()
  }

  load () {
    this._renderMenuList()
    this._updatePageName()
    return super.load()
  }

  /** @param {Component} component */
  setContentComponent (component) {
    if (!component) return

    const container = this.select('[data-root-container]')

    container.init({ component: component, currentStyle: this.currentStyle })

    container.render().load()
  }

  // ---------------------------------------------------------------------------
  _renderMenuList () {
    const menuList = /** @type {List} */ (this.select('[data-sidebar-list]'))

    const template = item => /* html */ `
      <span>${item['name']}</span>
    `

    menuList.init({ source: this.locations, template: template }).render()
  }

  _updatePageName () {
    const name = this.querySelector('[data-page-name]')
    const pathname = this.currentLocation.pathname
    const location = this.locations.find(location => location.path === pathname)

    if (location) name.textContent = location.name
  }

  _closeSidebar () {
    this.sidebar.close()
  }

  _onOpenSidebar () {
    this.sidebar.open()
  }

  /** @param {Event} event */
  _onListItemSelected (event) {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        bubbles: true,
        detail: { path: event['detail']['data']['path'] },
      }),
    )

    this._closeSidebar()
    this._updatePageName()
  }

  // ---------------------------------------------------------------------------
  get sidebar () {
    return /** @type {Sidebar} */ (this.select('[data-sidebar]'))
  }

  get styles () {
    importStyles(this.currentStyle)

    return /* html */ `
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

  get locations () {
    return [
      {
        name: 'Accordion',
        path: `/base/accordion`,
      },
      {
        name: 'Alert',
        path: `/base/alert`,
      },
      {
        name: 'Button',
        path: `/base/button`,
      },
      {
        name: 'Card',
        path: `/base/card`,
      },
      {
        name: 'Chart',
        path: `/base/chart`,
      },
      {
        name: 'Checkbox',
        path: `/base/checkbox`,
      },
      {
        name: 'Grid',
        path: `/base/grid`,
      },
      {
        name: 'Icon',
        path: `/base/icon`,
      },
      {
        name: 'Input',
        path: `/base/input`,
      },
      {
        name: 'List',
        path: `/base/list`,
      },
      {
        name: 'Map',
        path: `/base/map`,
      },
      {
        name: 'Modal',
        path: `/base/modal`,
      },
      {
        name: 'Multiselect',
        path: `/base/multiselect`,
      },
      {
        name: 'Navbar',
        path: `/base/navbar`,
      },
      {
        name: 'Paginator',
        path: `/base/paginator`,
      },
      {
        name: 'Radio',
        path: `/base/radio`,
      },
      {
        name: 'Select',
        path: `/base/select`,
      },
      {
        name: 'Sidebar',
        path: `/base/sidebar`,
      },
      {
        name: 'Splitview',
        path: `/base/splitview`,
      },
      {
        name: 'Table',
        path: `/base/table`,
      },
      {
        name: 'Tabs',
        path: `/base/tabs`,
      },
      {
        name: 'TreeTable',
        path: `/base/treetable`,
      },
      {
        name: 'Zone',
        path: `/base/zone`,
      },
    ]
  }
}
customElements.define('app-root', RootComponent)
