import '../../base/index'

export default class ArkShowcase extends HTMLElement {
  init (context) {
    this.type = context['type'] || 'ark'
  }

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
              <li data-component="modal">Modal</li>
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

        try {
          screenComponent.init({ 'type': this.type })
        } catch (error) {
          console.log(error)
        }

        this._setContent(screenComponent)
      })
  }

  async _loadComponent (component) {
    await import(`../../base/${component}/${component}Demo.js`)
    return Promise.resolve(document.createElement(`demo-${component}`))
  }

  _setContent (component) {
    const contentElement = this.querySelector('[data-content]')
    while (contentElement.firstChild) contentElement.firstChild.remove()
    contentElement.appendChild(component)
  }
}
