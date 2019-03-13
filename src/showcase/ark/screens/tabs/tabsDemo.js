// @ts-ignore
import '../../../../components/icon'
import '../../../../components/tabs'

export class TabsDemo extends HTMLElement {
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
      <div>
        <p>This is a tabs.</p>
      </div>

      <ark-tabs>
        <ark-tabs-item active>
          <ark-icon name="far fa-address-book"></ark-icon>
          <span>span-1</span>
        </ark-tabs-item>
        <ark-tabs-item>
          <ark-icon name="far fa-address-book"></ark-icon>
          <span>span-2</span>
        </ark-tabs-item>
        <ark-tabs-item>
          <ark-icon name="far fa-address-book"></ark-icon>
          <span>span-3</span>
        </ark-tabs-item>
        <ark-tabs-item>
          <ark-icon name="far fa-address-book"></ark-icon>
          <span>span-4</span>
        </ark-tabs-item>
        <ark-tabs-item>
          <ark-icon name="far fa-address-book"></ark-icon>
          <span>span-5</span>
        </ark-tabs-item>
        <ark-tabs-item>
          <ark-icon name="far fa-address-book"></ark-icon>
          <span>span-6</span>
        </ark-tabs-item>
      </ark-tabs>
    `
  }
}
customElements.define('demo-tabs', TabsDemo)
