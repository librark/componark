export class GridDemo extends HTMLElement {
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
  }

  _setup () {
    this._setupFrame('[data-mobile]')
    this._setupFrame('[data-tablet]')
    this._setupFrame('[data-desktop]')
  }

  _setupContent () {
    return /* html */`
      <style>
        ark-grid-item {
          text-align: center;
          background: rgba(0, 0, 255, 0.3) !important;
        }
      </style>

      <div>
        <p>This is a Layout Grid.</p>
        <hr/>

        <ark-grid cols="3" gap="15px">
          <ark-grid-item cols="3">header</ark-grid-item>
          <ark-grid-item rows="2">menu</ark-grid-item>
          <ark-grid-item>main</ark-grid-item>
          <ark-grid-item>right</ark-grid-item>
          <ark-grid-item cols="2">footer</ark-grid-item>
        </ark-grid>

        <hr/>

        <ark-grid cols="3" no-gutters>
          <ark-grid-item cols="2">1</ark-grid-item>
          <ark-grid-item rows="2">2</ark-grid-item>
          <ark-grid-item>3</ark-grid-item>
          <ark-grid-item>4</ark-grid-item>
        </ark-grid>

        <hr/>

        <ark-grid cols="6">
          <ark-grid-item>1</ark-grid-item>
          <ark-grid-item cols="4" rows="4" vertical="center">
            <ark-button background="primary">center</ark-button>
          </ark-grid-item>
          <ark-grid-item>2</ark-grid-item>
          <ark-grid-item>3</ark-grid-item>
          <ark-grid-item>4</ark-grid-item>
          <ark-grid-item>5</ark-grid-item>
          <ark-grid-item>6</ark-grid-item>
          <ark-grid-item>7</ark-grid-item>
          <ark-grid-item>9</ark-grid-item>
          <ark-grid-item>10</ark-grid-item>
          <ark-grid-item>11</ark-grid-item>
          <ark-grid-item>12</ark-grid-item>
          <ark-grid-item horizontal="start">start</ark-grid-item>
          <ark-grid-item horizontal="end">end</ark-grid-item>
          <ark-grid-item horizontal="center">center</ark-grid-item>
        </ark-grid>

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

      app.parentNode.removeChild(app)
      frameBody.prepend(main)
    }
  }
}
customElements.define('demo-grid', GridDemo)
