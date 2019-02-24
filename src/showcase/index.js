import './index.scss'

// @ts-ignore
// eslint-disable-next-line no-undef
const target = TARGET


class MainComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render () {
    this.innerHTML = /* html */`
    <div>
      <p>ComponArk</p>
      <ul>
        <li><a href="/ark.html">ARK</a></li>
        <li><a href="/material.html">MATERIAL</a></li>
        <li><a href="/bootstrap.html">BOOTSTRAP</a></li>
      </ul>
    </div>
    `
  }
}
customElements.define('app-main', MainComponent)


