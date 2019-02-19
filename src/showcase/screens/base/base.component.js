
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
        <section class="app-base__display">
            Display
            <app-button-demo></app-button-demo>
        </section>
    </div>
    `
    this._listen()
  }

  _listen () {
    this.root.querySelector('[data-components]').addEventListener(
      'click', () => {
        console.log('Click@!!!')
      })
  }
}
customElements.define('app-base', BaseComponent)
