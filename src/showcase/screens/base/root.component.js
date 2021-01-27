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
  render () {
    this.content = /* html */ `
    <nav class="app-root__navbar">
      <a class="app-root__navitem" href="/">Componark</a>
      <a class="app-root__navitem" href="#">Contact</a>
      <a class="app-root__navitem" href="#">About</a></li>
    </nav>

    <aside class="app-root__sidebar">
      <span class="app-root__sideitem">Menu</span> 
      ${this.locations.map((location) => `
      <a class="app-root__sideitem" href="${location.path}">
        ${location.name}
      </a>
      `).join("")}
    </aside>

    <section class="app-root__content" data-content></section>

    `
    return super.render()
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
  }

  /** @param {CustomEvent} event */
  onListItemSelected (event) {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        bubbles: true,
        detail: { path: event.detail.data.path }
      })
    )
  }

  get locations () {
    return [
      { name: 'Accordion', path: '/base/accordion' },
      { name: 'Alert', path: '/base/alert' },
      { name: 'Audio', path: '/base/audio' },
      { name: 'Button', path: '/base/button' },
      //{ name: 'Camera', path: '/base/camera' },
      { name: 'Card', path: '/base/card' },
      //{ name: 'Chart', path: '/base/chart' },
      //{ name: 'Checkbox', path: '/base/checkbox' },
      //{ name: 'Form', path: '/base/form' },
      //{ name: 'Grid', path: '/base/grid' },
      //{ name: 'Icon', path: '/base/icon' },
      { name: 'Input', path: '/base/input' },
      //{ name: 'List', path: '/base/list' },
      //{ name: 'Location', path: '/base/location' },
      //{ name: 'Map', path: '/base/map' },
      //{ name: 'Modal', path: '/base/modal' },
      //{ name: 'Multiselect', path: '/base/multiselect' },
      { name: 'Navbar', path: '/base/navbar' },
      //{ name: 'Paginator', path: '/base/paginator' },
      //{ name: 'Radio', path: '/base/radio' },
      //{ name: 'Select', path: '/base/select' },
      { name: 'Sidebar', path: '/base/sidebar' },
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
body {
  margin: 0;
  padding: 0;
}

:root {
  color: black;
  --background: white;

  --primary: blue;
  --secondary: orange;
  --success: green;
  --danger: red;
  --warning: yellow;
  --info: cyan;
  --dark: black;
  --muted: gray;
  --light: lightgray;
}

:root:hover {
   --background: yellow;
}

.app-root {
  display: grid;
}

.app-root__navbar {
  grid-column: 1 / 13;
  display: flex;
  background-color: #334455;
  color: #00ffff;
  text-decoration: none
  overflow: hidden;
}

.app-root__navitem {
  text-decoration: none;
  padding: 2vw;
  color: cyan;
}

.app-root__navitem:first-child {
  text-transform: uppercase;
}

.app-root__sidebar {
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  background-color: #334455;
  color: #00ffff;
  text-decoration: none
  overflow-x: hidden;
}

.app-root__sideitem {
  text-decoration: none;
  padding: 1vw;
  color: cyan;
}

.app-root__sideitem:first-child {
  text-transform: uppercase;
}

.app-root__content {
  grid-column: 2 / 13;
  padding: 2vmin;
}

`
Component.define(tag, RootComponent, styles)
