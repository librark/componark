export class SidebarDemo extends HTMLElement {
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
    this._lisen(this)
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

      this._lisen(main)

      app.parentNode.removeChild(app)
      frameBody.prepend(main)
    }

    this.querySelector(selector).appendChild(frame)
  }

  _setupContent () {
    return /* html */`
      <div>
        <p>This is a sidebar.</p>
        <button>OPEN!</button>
      </div>


      <ark-sidebar opened>
        <div slot="header">Menu</div>
        <div>body</div>
        <div slot="footer">footer</div>
      </ark-sidebar>
    `
  }

  _lisen (main) {
    main.querySelector('button').addEventListener('click', () =>
      main.querySelector('ark-sidebar').open()
    )
  }
}
customElements.define('demo-sidebar', SidebarDemo)
