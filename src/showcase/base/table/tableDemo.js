export class TableDemo extends HTMLElement {
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

      <iframe data-mobile src="/${this.type}.html" frameborder="1"
      width="360px"></iframe>

      <div>
        <p>TABLET (768px).</p>
        <hr align="left" width="768px" />
      </div>

      <iframe data-tablet src="/${this.type}.html" frameborder="1"
      width="768px"></iframe>

      <div>
        <p>DESKTOP (960px).</p>
        <hr align="left" width="960px" />
      </div>

      <iframe data-desktop src="/${this.type}.html" frameborder="1"
      width="960px"></iframe>

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
    this._initTable(this)
  }

  _setup () {
    this._setupFrame('[data-mobile]')
    this._setupFrame('[data-tablet]')
    this._setupFrame('[data-desktop]')
  }

  _setupContent () {
    return /* html */`
      <div>
        <p>This is a table.</p>
        <ark-table position></ark-table>
      </div>
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
      this._initTable(main)

      app.parentNode.removeChild(app)
      frameBody.prepend(main)
    }
  }

  _initTable (main) {
    let table = main.querySelector('ark-table')
    table.init({
      headers: { a: 'A', b: 'B', c: 'C' },
      data: [
        { a: 1, b: 2 },
        { a: 3, b: 4 },
        { c: 5 }
      ]
    })

    table.render()
  }
}
customElements.define('demo-table', TableDemo)
