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

      <div>
        <p>THIS DISPLAY.</p>
        <hr align="left" width="960px" />
      </div>

      <div data-display style="border: 1px solid;">
        ${this._setupContent()}
      </div>


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
        <p>data-ark-navbar-toggle</p>
      </div>
    `
    this._setup()
  }

  _setup () {
    const toggleButton = this.querySelector('[data-ark-navbar-toggle]')
    const navbar = this.querySelector('ark-navbar')
    toggleButton.addEventListener('click', () => navbar.toggleContent())
    this._setupFrame('[data-mobile]')
    this._setupFrame('[data-tablet]')
    this._setupFrame('[data-desktop]')
  }

  _setupContent () {
    return /* html */`
      <ark-navbar justify="between">
        <ark-navbar-nav>
          <button>Click!!</button>
          <span>x_Item 1-1</span>
          <span>x_Item 1-1</span>
          <span>x_Item 1-2</span>
          <span>x_Item 1-3</span>
          <button data-ark-navbar-toggle>Click!!</button>
        </ark-navbar-nav>
        <ark-navbar-nav>
          <span>x_Item 2-4</span>
          <span>x_Item 2-5</span>
          <span>x_Item 2-6</span>
          <span>x_Item 2-7</span>
        </ark-navbar-nav>
        <ark-navbar-nav>
          <span>x_Item 3-8</span>
          <span>x_Item 3-9</span>
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
      const toggleButton = main.querySelector('[data-ark-navbar-toggle]')
      const navbar = main.querySelector('ark-navbar')
      app.parentNode.removeChild(app)
      frameBody.prepend(main)

      toggleButton.addEventListener('click', () => navbar.toggleContent())
    }
  }
}
customElements.define('demo-navbar', NavbarDemo)
