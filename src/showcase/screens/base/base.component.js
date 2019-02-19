
export class BaseComponent extends HTMLElement {
  init () {
    return this
  }

  connectedCallback () {
    this.root = this
    this.render()
  }

  render () {
    this.root.innerHTML = /* html */`
    <div class="app-base">
        <h1>Hello World</h1>
        <section class="app-base__catalog">
            <ul data-components>
              <li data-component="accordion">Accordion</li>
              <li data-component="button">Button</li>
              <li data-component="card">Card</li>
            </ul>
        </section>
        <section class="app-base__display" data-display>
            Display
            <app-button-demo></app-button-demo>
        </section>
    </div>
    `
    this._listen()
  }

  _listen () {
    this.root.querySelector('[data-components]').addEventListener(
      'click', async (event) => {
        const component = event.target.dataset.component
        const displayComponent = this.root.querySelector('[data-display]')
        const screenComponent = await this._loadComponent(component)
        console.log('SCREEN>>>>', screenComponent)
        this._setDisplayComponent(displayComponent, screenComponent)
      })
  }

  async _loadComponent (component) {
    await import(`./${component}/${component}Demo.js`)
    return Promise.resolve(document.createElement(`ark-${component}`))
  }

  _setDisplayComponent (displayComponent, screenComponent) {
    while (displayComponent.firstChild) displayComponent.firstChild.remove()
    displayComponent.appendChild(screenComponent)
  }
}
customElements.define('app-base', BaseComponent)
