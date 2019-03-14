import './styles/main.scss'

export class ArkShowcaseComponent extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  styles () {
    return /* html */`
    <style>
      .app-showcase-ark__main {
        display: flex;
        flex-direction: row;
      }
      .app-showcase-ark__content {
        margin: 0 auto;
      }
    </style>
    `
  }

  render () {
    this.innerHTML = /* html */`${this.styles()}
    <p>Ark Showcase</p>
    <div class="app-showcase-ark__main">
      <div class="app-showcase-ark__catalog">
        <ul data-components>
          <li data-component="accordion">Accordion</li>
          <li data-component="alert">Alert</li>
          <li data-component="button">Button</li>
          <li data-component="card">Card</li>
          <li data-component="icon">Icon</li>
          <li data-component="list">List</li>
          <li data-component="navbar">Navbar</li>
          <li data-component="select">Select</li>
          <li data-component="sidebar">Sidebar</li>
          <li data-component="tabs">Tabs</li>
        </ul>
      </div>
      <div class="app-showcase-ark__content" data-content>
      </div>
    </div>
    `
    this._listen()
  }

  _listen () {
    this.querySelector('[data-components]').addEventListener(
      'click', async (event) => {
        const item = /** @type {HTMLElement} */ (event.target)
        const componentName = item.dataset.component
        const screenComponent = await this._loadComponent(componentName)
        console.log('SCREEN>>>>', screenComponent)
        this._setContent(screenComponent)
      })
  }

  async _loadComponent (component) {
    await import(`./screens/${component}/${component}Demo.js`)
    return Promise.resolve(document.createElement(`demo-${component}`))
  }

  _setContent (component) {
    const contentElement = this.querySelector('[data-content]')
    while (contentElement.firstChild) contentElement.firstChild.remove()
    contentElement.appendChild(component)
  }
}
customElements.define('app-showcase-ark', ArkShowcaseComponent)
