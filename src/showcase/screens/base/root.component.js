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
      <a class="app-root__navitem" href="/">
        <div class="app-root__title">Componark</div>
        <div class="app-root__subtitle">web components</div>
      </a>
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
      { name: 'List', path: '/base/list' },
      { name: 'Icon', path: '/base/icon' },
      { name: 'Input', path: '/base/input' },
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
      { name: 'SplitView', path: '/base/splitview' },
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

  background-color: #fff7ea;
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

.app-root {
  display: grid;
  font-family: 'Cairo', helvetica, sans-serif;
  letter-spacing: 0.02em;
}

.app-root__navbar {
  grid-column: 1 / 13;
  display: flex;
  background-color: #334455;
  color: #00ffff;
  text-decoration: none
  overflow: hidden;
  border-bottom:5px solid cyan;
  align-items:center;
}

.app-root__navitem {
  text-decoration: none;
  padding: 2vw;
  color: cyan;
  height:auto;
}

.app-root__navitem,
.app-root__sideitem {
  transition: all 0.2s ease-in-out;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
}

.app-root__navitem:hover,
.app-root__sideitem:hover {
  background-color: white;
  color:black;
}

.app-root__title {
  font-weight: 700;
  font-size: 1.3rem;
  text-transform: uppercase;
}

.app-root__subtittle {
  display:block;
  font-size:0.9rem;
  font-weight: 300;
  text-transform:none;
  position:relative;
  bottom: 10px;
  height:10px;
  text-align:center;
}

.app-root__sidebar {
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  background-color: #334455;
  color: #00ffff;
  text-decoration: none
  overflow-x: hidden;
  width:100%;
}

.app-root__sideitem {
  text-decoration: none;
  padding: 1vw;
  color: cyan;
}

.app-root__sideitem:first-child {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.2rem;
  text-align:center;
}

.app-root__content {
  grid-column: 2 / 13;
  padding: 2vmin;
}

`
Component.define(tag, RootComponent, styles)
