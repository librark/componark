// @ts-ignore
import Image from './assets/building.jpg'

export class CardDemo extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
    <div mobile><p>mobile (360px).</p></div>
    <div tablet><p>tablet (768px).</p></div>
    <div desktop><p>desktop (960px).</p></div>
    ${this._setupContent()}
  `
    this._setupFrame('[mobile]', '360px')
    this._setupFrame('[tablet]', '768px')
    this._setupFrame('[desktop]', '960px')
  }

  _setupFrame (selector, width) {
    const content = this._setupContent()
    const frame = document.createElement('iframe')
    frame.setAttribute('src', '/ark.html')
    frame.setAttribute('frameborder', '1')
    frame.setAttribute('width', width)
    frame.setAttribute('height', '640px')
    frame.onload = () => {
      const frameBody = frame.contentDocument.querySelector('body')
      const app = frameBody.querySelector('app-showcase-ark')
      const main = document.createElement('main')
      main.innerHTML = content

      app.parentNode.removeChild(app)
      frameBody.prepend(main)
    }

    this.querySelector(selector).appendChild(frame)
  }

  _setupContent () {
    return /* html */`
    <ark-card>
      <img slot="media" src="${Image}" alt=""/>

      <span slot="title">titulo</span>
      <span slot="subtitle">subtitulo</span>

      <div>
        body
      </div>

      <ark-button slot="action">btn 1</ark-button>
      <ark-button slot="action">btn 2</ark-button>
    </ark-card>
  `
  }
}
customElements.define('demo-card', CardDemo)
