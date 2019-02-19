import './_base.scss'

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
    <div class="demo-base">
      <h1>ComponArk</h1>
      <div class="demo-base__container">
        <section class="demo-base__catalog">
          <ul data-components>
            <li data-component="accordion">Accordion</li>
            <li data-component="button">Button</li>
            <li data-component="card">Card</li>
          </ul>
        </section>
        <section class="demo-base__display" data-display>
          <p>Display</p>
        </section>
      </div>
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
    return Promise.resolve(document.createElement(`demo-${component}`))
  }

  _setDisplayComponent (displayComponent, screenComponent) {
    while (displayComponent.firstChild) displayComponent.firstChild.remove()
    displayComponent.appendChild(screenComponent)
  }
}
customElements.define('app-base', BaseComponent)
