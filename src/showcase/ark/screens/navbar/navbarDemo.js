// @ts-ignore
import '../../../../components/navbar'

export class NavbarDemo extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
      <div>
        <p>MOBILE (360px).</p>
        <hr align="left" width="360px"  />
      </div>

      <iframe data-mobile src="/ark.html" frameborder="1" width="360px">
      </iframe>

      <div>
        <p>TABLET (768px).</p>
        <hr align="left" width="768px" />
      </div>

      <iframe data-tablet src="/ark.html" frameborder="1" width="768px">
      </iframe>

      <div>
        <p>DESKTOP (960px).</p>
        <hr align="left" width="960px" />
      </div>

      <iframe data-desktop src="/ark.html" frameborder="1" width="960px">
      </iframe>

      <!-- DOCUMENTATION -->

      <div>
        <h3>ark-navbar</h3>
        <small>Attributes:</small>
        <p>fixed-top</p>
        <hr/>
        <small>Justify:</small>
        <p>center</p>
        <p>end</p>
        <p>between</p>
      </div>
      <div>
        <h3>ark-navbar-nav</h3>
        <small>Attributes:</small>
        <p>header</p>
      </div>
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
      <ark-navbar justify="between">
        <ark-navbar-nav>
          <button>Click!!</button>
          <ark-navbar-nav-item>x_Item 1-1</ark-navbar-nav-item>
          <ark-navbar-nav-item>x_Item 1-2</ark-navbar-nav-item>
          <ark-navbar-nav-item>x_Item 1-3</ark-navbar-nav-item>
          <button>Click!!</button>
        </ark-navbar-nav>
        <ark-navbar-nav>
          <ark-navbar-nav-item>x_Item 2-4</ark-navbar-nav-item>
          <ark-navbar-nav-item>x_Item 2-5</ark-navbar-nav-item>
          <ark-navbar-nav-item>x_Item 2-6</ark-navbar-nav-item>
          <ark-navbar-nav-item>x_Item 2-7</ark-navbar-nav-item>
        </ark-navbar-nav>
        <ark-navbar-nav>
          <ark-navbar-nav-item>x_Item 3-8</ark-navbar-nav-item>
          <ark-navbar-nav-item>x_Item 3-9</ark-navbar-nav-item>
        </ark-navbar-nav>
      </ark-navbar>
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
customElements.define('demo-navbar', NavbarDemo)
