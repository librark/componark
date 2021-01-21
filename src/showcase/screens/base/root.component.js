import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';
import xml from 'highlight.js/lib/languages/xml';
import { Component } from 'base/component'

hljs.registerLanguage('html', xml);
hljs.initHighlightingOnLoad()

// @ts-ignore
// eslint-disable-next-line no-undef
export const version = VERSION

const tag = 'app-root'
export class RootComponent extends Component {
  /** @param {Object} context */
  init (context) {
    this.path = context.path

    // Local
    this.currentLocation = window.location
    //this.themeService = new ThemeService()

    return super.init()
  }

  render () {
    //this.style.cssText = '--background: blue;'
    this.content = /* html */ `
    <nav class="app-root__navbar">
      <h1>Componark</h1>
      <ul>
        <li><a class="active" href="#home">Home</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>

    <aside class="app-root__sidebar">
      <h3>Menu</h3> 
      ${this.locations.map((location) => `
      <a href="${location.path}">${location.name}</a>
      `).join("")}
    </aside>

    <section data-content></section>

    `
    return super.render()
  }

  //render () {
    //this.innerHTML = [> html <] `${this.styles}
      //<ark-navbar justify='between' background="primary" color="white">
        //<ark-nav brand>
          //<ark-button listen on-click='onOpenSidebar'>
            //<ark-icon name='fas fa-bars'></ark-icon>
          //</ark-button>
          //<span class='font-size' data-page-name>Componark</span>
        //</ark-nav>

      //</ark-navbar>

      //<ark-sidebar data-sidebar >
        //<div slot='header'>
          //<strong>Componark</strong>
          //<br/>
          //<small>Version: ${version}</small>
        //</div>
        //<ark-list listen on-list:selected='onListItemSelected'
          //data-sidebar-list action default>
        //</ark-list>
      //</ark-sidebar>

      //<div class='root-content' data-content></div>
    //`
    //return super.render()
  //}

  async load () {
    //this.tenderMenuList()
    //this.updatePageName()
    return super.load()
  }

  /** @param {Component} component */
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

    //this.themeService.set('style', style)
    //this.themeService.reload()
  }

  //updatePageName () {
    //const name = this.querySelector('[data-page-name]')
    //const pathname = this.currentLocation.pathname
    //const location = this.locations.find(
      //location => location.path === pathname
    //)

    //if (location) name.textContent = location.name
  //}

  /** @param {CustomEvent} event */
  onListItemSelected (event) {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        bubbles: true,
        detail: { path: event.detail.data.path }
      })
    )

    //this.updatePageName()

  }

  get locations () {
    return [
      { name: 'Accordion', path: '/base/accordion' },
      { name: 'Alert', path: '/base/alert' },
      { name: 'Audio', path: '/base/audio' },
      { name: 'Button', path: '/base/button' },
      //{ name: 'Camera', path: '/base/camera' },
      //{ name: 'Card', path: '/base/card' },
      //{ name: 'Chart', path: '/base/chart' },
      //{ name: 'Checkbox', path: '/base/checkbox' },
      //{ name: 'Form', path: '/base/form' },
      //{ name: 'Grid', path: '/base/grid' },
      //{ name: 'Icon', path: '/base/icon' },
      //{ name: 'Input', path: '/base/input' },
      //{ name: 'List', path: '/base/list' },
      //{ name: 'Location', path: '/base/location' },
      //{ name: 'Map', path: '/base/map' },
      //{ name: 'Modal', path: '/base/modal' },
      //{ name: 'Multiselect', path: '/base/multiselect' },
      //{ name: 'Navbar', path: '/base/navbar' },
      //{ name: 'Paginator', path: '/base/paginator' },
      //{ name: 'Pivot', path: '/base/pivot' },
      //{ name: 'Radio', path: '/base/radio' },
      //{ name: 'Select', path: '/base/select' },
      //{ name: 'Sidebar', path: '/base/sidebar' },
      //{ name: 'Signature', path: '/base/signature' },
      //{ name: 'Spinner', path: '/base/spinner' },
      //{ name: 'SplitView', path: '/base/splitview' },
      //{ name: 'Table', path: '/base/table' },
      //{ name: 'Tabs', path: '/base/tabs' },
      //{ name: 'Tabulator', path: '/base/tabulator' },
      //{ name: 'Tooltip', path: '/base/tooltip' },
      //{ name: 'TreeTable', path: '/base/treetable' },
      //{ name: 'Zone', path: '/base/zone' },
    ]
  }
}

const styles = `
:root {
  color: black;
  --background: red;

  --primary: green;
  --roundness
  --secondary: orange;

}
:root:hover {
   --background: yellow;

}
`
Component.define(tag, RootComponent, styles)
