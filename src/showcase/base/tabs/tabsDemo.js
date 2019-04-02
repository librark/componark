export class TabsDemo extends HTMLElement {
  init (context) {
    this.type = context['type'] || 'ark'
    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
      <div>
        <p>MOBILE (360px).</p>
        <hr align="left" width="360px"/>
      </div>

      <iframe data-mobile src="/${this.type}.html" frameborder="1" width="360px">
      </iframe>

      <div>
        <p>TABLET (768px).</p>
        <hr align="left" width="768px" />
      </div>

      <iframe data-tablet src="/${this.type}.html" frameborder="1" width="768px">
      </iframe>

      <div>
        <p>DESKTOP (960px).</p>
        <hr align="left" width="960px" />
      </div>

      <iframe data-desktop src="/${this.type}.html" frameborder="1" width="960px">
      </iframe>

      <div>
        <p>THIS DISPLAY.</p>
        <hr align="left" width="960px" />
      </div>

      <div data-display style="border: 1px solid;">
        ${this._setupContent()}
      </div>


      <!-- DOCUMENTATION -->
    `
    this._setup()
  }

  _setup () {
    this._setupFrame('[data-mobile]')
    this._setupFrame('[data-tablet]')
    this._setupFrame('[data-desktop]')
  }

  _setupContent () {
    return /* html */`
      <div>
        <p>This is a tabs.</p>
      </div>

      <ark-tabs>
        <ark-tabs-item id="1">
          <ark-icon name="far fa-address-book"></ark-icon>
          <span>span-1</span>
        </ark-tabs-item>
        <ark-tabs-item id="2">
          <ark-icon name="far fa-address-book"></ark-icon>
          <span>span-2 asdf asdfs</span>
        </ark-tabs-item>
        <ark-tabs-item id="3">
          <ark-icon name="far fa-address-book"></ark-icon>
          <span>span-3 asdfasdf</span>
        </ark-tabs-item>
        <ark-tabs-item id="4">
          <ark-icon name="far fa-address-book"></ark-icon>
          <span>span-4</span>
        </ark-tabs-item>
        <ark-tabs-item id="5">
          <ark-icon name="far fa-address-book"></ark-icon>
          <span>span-5 asdfasdf</span>
        </ark-tabs-item>
        <ark-tabs-item id="6">
          <ark-icon name="far fa-address-book"></ark-icon>
          <span>span-6 asdfsdfefw</span>
        </ark-tabs-item>
      </ark-tabs>
    `
  }

  _setupFrame (frameName) {
    const content = this._setupContent()
    const frame = this.querySelector(frameName)
    frame.onload = () => {
      const frameBody = frame.contentDocument.querySelector('body')
      const app = frameBody.querySelector('app-showcase-ark')
      const main = document.createElement('main')
      main.innerHTML = content

      app.parentNode.removeChild(app)
      frameBody.prepend(main)
    }
  }
}
customElements.define('demo-tabs', TabsDemo)
