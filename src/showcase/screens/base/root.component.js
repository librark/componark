import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';
import xml from 'highlight.js/lib/languages/xml';
import { Component } from '../loader'
import { ThemeService } from '../theme/theme.service'

hljs.registerLanguage('html', xml);
hljs.initHighlightingOnLoad()

/**
 * @typedef {import('../loader').List} List
 * @typedef {import('../loader').Sidebar} Sidebar
 * */

// @ts-ignore
// eslint-disable-next-line no-undef
export const version = VERSION

export class RootComponent extends Component {
  /** @param {Object} context */
  init (context) {
    this.path = context.path

    // Local
    this.currentLocation = window.location
    this.themeService = new ThemeService()

    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `${this.styles}
      <ark-navbar justify='between' background="primary" color="white">
        <ark-nav brand>
          <ark-button listen on-click='onOpenSidebar'>
            <ark-icon name='fas fa-bars'></ark-icon>
          </ark-button>
          <span class='font-size' data-page-name>Componark</span>
        </ark-nav>

        <ark-nav toggler>
          <ark-select listen on-alter="selectEventListener" label="Estilo:">
            <option value="material" ${this.themeService.currentStyle() === 'material' ? 'selected' : ''
      }>Material</option>
            <option value="bootstrap" ${this.themeService.currentStyle() === 'bootstrap' ? 'selected' : ''
      }>bootstrap</option>
            <option value="ark" ${this.themeService.currentStyle() === 'ark' ? 'selected' : ''
      }>ark</option>
          </ark-select>
        </ark-nav>

      </ark-navbar>

      <ark-sidebar data-sidebar >
        <div slot='header'>
          <strong>Componark</strong>
          <br/>
          <small>Version: ${version}</small>
        </div>
        <ark-list listen on-list:selected='onListItemSelected'
          data-sidebar-list action default>
        </ark-list>
      </ark-sidebar>

      <div class='root-content' data-content></div>
    `
    return super.render()
  }

  load () {
    this.renderMenuList()
    this.updatePageName()
    return super.load()
  }

  /** @param {Component}c> component */
  setContentComponent (component) {
    if (!component) return
    const container = this.select('[data-content]')

    container.firstChild?.remove()
    container.append(component)
    component.render().load()
  }

  /** @param {CustomEvent} event */
  selectEventListener (event) {
    event.stopImmediatePropagation()
    const style = event.detail.value

    this.themeService.set('style', style)
    this.themeService.reload()
  }

  renderMenuList () {
    const menuList = /** @type {List} */ (this.select('[data-sidebar-list]'))
    const template = item => /* html */ `
      <span>${item.name}</span>
    `

    menuList.init({ source: this.locations, template: template }).render()
  }

  updatePageName () {
    const name = this.querySelector('[data-page-name]')
    const pathname = this.currentLocation.pathname
    const location = this.locations.find(
      location => location.path === pathname
    )

    if (location) name.textContent = location.name
  }

  closeSidebar () {
    this.select('[data-sidebar]').close()
  }

  onOpenSidebar () {
    this.select('[data-sidebar]').open()
  }

  /** @param {CustomEvent} event */
  onListItemSelected (event) {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        bubbles: true,
        detail: { path: event.detail.data.path }
      })
    )

    this.closeSidebar()
    this.updatePageName()
  }

  get locations () {
    return [
      { name: 'Accordion', path: '/base/accordion' },
      { name: 'Alert', path: '/base/alert' },
      { name: 'Audio', path: '/base/audio' },
      { name: 'Button', path: '/base/button' },
      { name: 'Camera', path: '/base/camera' },
      { name: 'Card', path: '/base/card' },
      { name: 'Chart', path: '/base/chart' },
      { name: 'Checkbox', path: '/base/checkbox' },
      { name: 'Form', path: '/base/form' },
      { name: 'Grid', path: '/base/grid' },
      { name: 'Icon', path: '/base/icon' },
      { name: 'Input', path: '/base/input' },
      { name: 'List', path: '/base/list' },
      { name: 'Location', path: '/base/location' },
      { name: 'Map', path: '/base/map' },
      { name: 'Modal', path: '/base/modal' },
      { name: 'Multiselect', path: '/base/multiselect' },
      { name: 'Navbar', path: '/base/navbar' },
      { name: 'Paginator', path: '/base/paginator' },
      { name: 'Pivot', path: '/base/pivot' },
      { name: 'Radio', path: '/base/radio' },
      { name: 'Select', path: '/base/select' },
      { name: 'Sidebar', path: '/base/sidebar' },
      { name: 'Signature', path: '/base/signature' },
      { name: 'Spinner', path: '/base/spinner' },
      { name: 'SplitView', path: '/base/splitview' },
      { name: 'Table', path: '/base/table' },
      { name: 'Tabs', path: '/base/tabs' },
      { name: 'Tabulator', path: '/base/tabulator' },
      { name: 'Tooltip', path: '/base/tooltip' },
      { name: 'TreeTable', path: '/base/treetable' },
      { name: 'Zone', path: '/base/zone' },
    ]
  }

  get styles () {
    return /* html */ `
      <style>
        app-root{
          display: grid;
          grid: auto 1fr / 1fr;

          max-width: 100vw;
          width: 100%;

          max-height: 100vh;
          height: 100vh;
        }
        app-root .root-content {
          width: 100%;
          height: 100%;
          overflow: auto;
          padding: 20px;
        }

        table {
          width: 100%;
          padding-bottom: 20px;
        }

        td, th {
          border: 1px solid #ddd;
          padding: 5px;
        }

        tbody tr:hover {
          background-color: #ddd;
        }

        .introduction {
          padding-bottom: 25px;
        }

        .implementation {
          padding: 25px;
          width: 90vw;
        }

        .examples {
          padding: 15px;
        }

        .reference {
          padding: 15px;
        }

        .example {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          background-color: whitesmoke;
          padding: 10px;
        }

        .example .code {
          padding: 10px;
        }

      </style>
    `
  }
}
customElements.define('app-root', RootComponent)
