import "./root.content.component"

import { Component } from "../loader"
import { ThemeService } from "../theme/theme.service"

/**
 * @typedef {import('../loader').List} List
 * @typedef {import('../loader').Sidebar} Sidebar
 * */

// @ts-ignore
// eslint-disable-next-line no-undef
export const version = VERSION

export class RootComponent extends Component {
  /** @param {{ path: String }} context */
  init(context) {
    this.path = context["path"]

    // -------------------------------------------------------------------------
    // Local
    // -------------------------------------------------------------------------
    this.currentLocation = window.location
    this.themeService = new ThemeService()

    return super.init()
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}
      <ark-navbar justify='between' background="primary" color="white">

        <ark-nav brand>
          <ark-button listen on-click='_onOpenSidebar'>
            <ark-icon name='fas fa-bars'></ark-icon>
          </ark-button>
          <span class='font-size' data-page-name>Componark</span>
        </ark-nav>

        <ark-nav toggler>
          <ark-select listen on-alter="selectEventListener" label="Estilo:">
            <option value="material" ${
      this.themeService.currentStyle() === "material" ? "selected" : ""
      }>Material</option>
            <option value="bootstrap" ${
      this.themeService.currentStyle() === "bootstrap" ? "selected" : ""
      }>bootstrap</option>
            <option value="ark" ${
      this.themeService.currentStyle() === "ark" ? "selected" : ""
      }>ark</option>
          </ark-select>
        </ark-nav>

      </ark-navbar>

      <ark-sidebar data-sidebar>
        <div slot='header'>
          <strong>Componark</strong>
          <br/>
          <small>Versión: ${version}</small>
        </div>
        <ark-list listen on-list:selected='_onListItemSelected'
          data-sidebar-list action default>
        </ark-list>
        <!-- <div slot='footer'></div> -->
      </ark-sidebar>

      <div class='root-content' data-root>
        <app-root-container data-root-container></app-root-container>
      </div>
    `
    return super.render()
  }

  load() {
    this._renderMenuList()
    this._updatePageName()
    return super.load()
  }

  /** @param {Component} component */
  setContentComponent(component) {
    if (!component) return

    const container = this.select("[data-root-container]")

    container.init({
      component: component,
      currentStyle: this.themeService.currentStyle()
    })

    container.render().load()
  }

  /** @param {CustomEvent} event */
  selectEventListener(event) {
    event.stopImmediatePropagation()
    const style = event.detail.value

    this.themeService.set("style", style)
    this.themeService.reload()
  }

  // ---------------------------------------------------------------------------
  _renderMenuList() {
    const menuList = /** @type {List} */ (this.select("[data-sidebar-list]"))

    const template = item => /* html */ `
      <span>${item["name"]}</span>
    `

    menuList.init({ source: this.locations, template: template }).render()
  }

  _updatePageName() {
    const name = this.querySelector("[data-page-name]")
    const pathname = this.currentLocation.pathname
    const location = this.locations.find(location => location.path === pathname)

    if (location) name.textContent = location.name
  }

  _closeSidebar() {
    this.sidebar.close()
  }

  _onOpenSidebar() {
    this.sidebar.open()
  }

  /** @param {Event} event */
  _onListItemSelected(event) {
    this.dispatchEvent(
      new CustomEvent("navigate", {
        bubbles: true,
        detail: { path: event["detail"]["data"]["path"] }
      })
    )

    this._closeSidebar()
    this._updatePageName()
  }

  // ---------------------------------------------------------------------------
  get sidebar() {
    return /** @type {Sidebar} */ (this.select("[data-sidebar]"))
  }

  get locations() {
    return [
      { name: "Accordion", path: `/base/accordion` },
      { name: "Alert", path: `/base/alert` },
      { name: "Audio", path: `/base/audio` },
      { name: "Button", path: `/base/button` },
      { name: "Camera", path: `/base/camera` },
      { name: "Card", path: `/base/card` },
      { name: "Chart", path: `/base/chart` },
      { name: "Checkbox", path: `/base/checkbox` },
      { name: "Grid", path: `/base/grid` },
      { name: "Icon", path: `/base/icon` },
      { name: "Input", path: `/base/input` },
      { name: "List", path: `/base/list` },
      { name: "Location", path: `/base/location` },
      { name: "Map", path: `/base/map` },
      { name: "Modal", path: `/base/modal` },
      { name: "Multiselect", path: `/base/multiselect` },
      { name: "Navbar", path: `/base/navbar` },
      { name: "Paginator", path: `/base/paginator` },
      { name: "Radio", path: `/base/radio` },
      { name: "Select", path: `/base/select` },
      { name: "Sidebar", path: `/base/sidebar` },
      { name: "Signature", path: `/base/signature` },
      { name: "Spinner", path: `/base/spinner` },
      { name: "Splitview", path: `/base/splitview` },
      { name: "Table", path: `/base/table` },
      { name: "Tabs", path: `/base/tabs` },
      { name: "Tooltip", path: `/base/tooltip` },
      { name: "TreeTable", path: `/base/treetable` },
      { name: "Zone", path: `/base/zone` }
    ]
  }

  get styles() {
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
        }
      </style>
    `
  }
}
customElements.define("app-root", RootComponent)
