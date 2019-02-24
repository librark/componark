import './assets/styles/main.scss'

// @ts-ignore
// eslint-disable-next-line no-undef
const target = TARGET


class MainComponent extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
    <div>
      <p>Hello World</p>
    </div>
    `
  }
}
customElements.define('app-main', MainComponent)
