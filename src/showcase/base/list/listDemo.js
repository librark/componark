export class ListDemo extends HTMLElement {
  init (context) {
    this.type = context['type'] || 'ark'
    return this
  }

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
    frame.setAttribute('src', `/${this.type}.html`)
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
      <p>list item</p>

      <ark-list>
        <ark-item>
          <span>fa-address-book</span>
          <div slot="start">
            <ark-icon name="fas fa-address-book"></ark-icon>
          </div>
          <div slot="end">1</div>
          <div slot="end">2</div>
          <div slot="end">3</div>
          <div slot="end">4</div>
        </ark-item>
        <ark-item>
          <div>fa-address-book</div>
          <div slot="start">
            <ark-icon name="far fa-address-book"></ark-icon>
          </div>
          <div slot="end">far</div>
        </ark-item>
      </ark-list>

      <ark-list>
        <ark-item>
          <div>fa-address-book</div>
          <div slot="end">
            <ark-icon name="fas fa-address-book"></ark-icon>
          </div>
        </ark-item>
        <ark-item>
          <div>fa-address-book</div>
          <div slot="end">
            <ark-icon name="far fa-address-book"></ark-icon>
          </div>
        </ark-item>
      </ark-list>
    `
  }
}
customElements.define('demo-list', ListDemo)
