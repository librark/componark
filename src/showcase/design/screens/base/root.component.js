import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/github.css'
import xml from 'highlight.js/lib/languages/xml'
import { Component } from 'base/component'

hljs.registerLanguage('html', xml)
hljs.initHighlightingOnLoad()

// @ts-ignore
// eslint-disable-next-line no-undef
export const version = VERSION

const design = process.env.ARK_DESIGN

const tag = 'app-root'
export class RootComponent extends Component {
  render() {
    this.content = /* html */ `
    <nav class="app-root__navbar">
      <div class="app-root__menu">
        <span class="material-icons">
          list
        </span>
      </div>
      <div class="app-root__brand">
        <a  href="/">
          <h1 class="app-root__title">COMPONARK</h1>
          <p class="app-root__subtitle">web components</p>
        </a>
      </div>
      <div class="app-root__actions"> 
        <a class="app-root__navitem" href="#">style ${design.toUpperCase()}</a>
      </div>  
    </nav>
    
    <aside class="app-root__sidebar"> 
        ${this.locations
          .map(
            (location) => `
        <a class="app-root__sideitem" href="/${design}${location.path}">
          ${location.name}
        </a>
        `
          )
          .join('')}
    </aside>

    <section class="app-root__content" data-content></section>

    `
    this.showMenu()
    return super.render()
  }

  /** @param {Component} component */
  setContentComponent(component) {
    if (!component) return
    const container = this.select('[data-content]')

    container.firstChild?.remove()
    container.append(component)
    component.render().load()
  }

  /** @param {CustomEvent} event */
  selectEventListener(event) {
    event.stopImmediatePropagation()
    const style = event.detail.value
  }

  /** @param {CustomEvent} event */
  onListItemSelected(event) {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        bubbles: true,
        detail: { path: event.detail.data.path },
      })
    )
  }

  showMenu() {
    this.querySelector('.app-root__menu').addEventListener('click', () => {
      this.querySelector('.app-root__sidebar').style.display = 'grid'
    })
  }

  get locations() {
    return [
      { name: 'Accordion', path: '/base/accordion' },
      { name: 'Alert', path: '/base/alert' },
      { name: 'Audio', path: '/base/audio' },
      { name: 'Button', path: '/base/button' },
      { name: 'Camera', path: '/base/camera' },
      { name: 'Card', path: '/base/card' },
      { name: 'Chart', path: '/base/chart' },
      { name: 'Checkbox', path: '/base/checkbox' },
      { name: 'Droparea', path: '/base/droparea' },
      { name: 'Gallery', path: '/base/gallery' },
      { name: 'Icon', path: '/base/icon' },
      { name: 'List', path: '/base/list' },
      { name: 'Input', path: '/base/input' },
      { name: 'Location', path: '/base/location' },
      { name: 'Map', path: '/base/map' },
      { name: 'Modal', path: '/base/modal' },
      { name: 'Multiselect', path: '/base/multiselect' },
      { name: 'Navbar', path: '/base/navbar' },
      { name: 'Paginator', path: '/base/paginator' },
      { name: 'Radio', path: '/base/radio' },
      { name: 'Select', path: '/base/select' },
      { name: 'Sidebar', path: '/base/sidebar' },
      { name: 'Signature', path: '/base/signature' },
      { name: 'Spinner', path: '/base/spinner' },
      { name: 'SplitView', path: '/base/splitview' },
      { name: 'Table', path: '/base/table' },
      { name: 'Tabs', path: '/base/tabs' },
      { name: 'Tooltip', path: '/base/tooltip' },
      { name: 'Translate', path: '/base/translate' },
      //{ name: 'TreeTable', path: '/base/treetable' },
      //{ name: 'Zone', path: '/base/zone' },
    ]
  }
}

const styles = /* css */ `

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
  --xs: 0.3rem;
  --sm: 0.8rem;
  --md: 1rem;
  --lg: 2rem;
  --xl: 3rem;
}

.${tag} {
  display: grid;
  grid-template-rows: 0.05fr 1fr;
  font-family: 'Cairo', helvetica, sans-serif;
  letter-spacing: 0.02em;
}

.${tag}__navbar {
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  background-color: #334455;
  color: #00ffff;
  text-decoration: none
  overflow: hidden;
  border-bottom:5px solid cyan;
  place-items:center;
}

.material-icons {
  font-size: 2.5rem;
}

.${tag}__navitem {
  text-decoration: none;
  padding: 2vw;
  color: cyan;
  height:auto;
}

.${tag}__sideitems {
  display: flex;
  flex-direction: column;
}

.${tag}__navitem,
.${tag}__sideitem {
  transition: background 0.2s ease-in-out;
}

.${tag}__navitem:hover,
.${tag}__sideitem:hover {
  background-color: white;
  color:black;
}

.${tag}__brand {
  display: grid;
  align-items: center;
  background: white;
  padding: 0 1rem;
  height: 100%;
  width: fit-content;
  justify-self: start;
}

.${tag}__brand a {
  text-decoration: none;
  text-align: center;
  margin: 0;
}

.${tag}__actions {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-items: center;
  grid-column: 6;
}

.${tag}__title {
  all: inherit;
  font-weight: 700;
  font-size: 1.3rem;
}

.${tag}__subtitle {
  all: inherit;
  font-size:0.9rem;
  font-weight: 300;
  text-align:center;
}

.${tag}__sidebar {
  grid-row: 2 / -1;
  display: grid;
  background-color: #334455;
  color: #00ffff;
  text-decoration: none;
  overflow-x: hidden;
  width: fit-content;
}

.${tag}__navbar-brand {
  display: none;
}

.${tag}__sideitem {
  text-decoration: none;
  padding: 1vw;
  color: cyan;
}

.${tag}__menu {
  display: none;
  text-align:center;
  user-select: none;
  cursor: pointer;
}

.${tag}__content {
  grid-area: 2 / 2 / auto / 13;
  padding: 2vmin;
  overflow-x: hidden;
  overflow-y: auto;
}

@media only screen and (max-width: 800px) {
  .${tag}__sidebar {
    display: none;
    position: absolute;
    z-index: 1000;
    width: 150px;
  }

  .${tag}__menu {
    display: grid;
  }

  .${tag}__content {
    grid-area: 2 / 1 / auto / 13;
  }

  .${tag}__brand {
    grid-column: 3 / 5;
    justify-self: center;
  }

}
`
Component.define(tag, RootComponent, styles)
