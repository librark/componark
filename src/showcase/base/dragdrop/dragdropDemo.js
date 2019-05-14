export class DragDropDemo extends HTMLElement {
  init (context) {
    this.type = context['type'] || 'ark'
    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
      <!-- <div mobile><p>mobile (360px).</p></div>
      <div tablet><p>tablet (768px).</p></div>
      <div desktop><p>desktop (960px).</p></div> -->
      ${this._setupContent()}
      ${this.doc}
    `
    // this._setupFrame('[mobile]', '360px')
    // this._setupFrame('[tablet]', '768px')
    // this._setupFrame('[desktop]', '960px')
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
      app.parentNode.removeChild(app)

      const main = document.createElement('main')
      main.innerHTML = content
      frameBody.prepend(main)
    }

    this.querySelector(selector).appendChild(frame)
  }

  _setupContent () {
    return /* html */`
      <style>
        ark-grid {
          height: 40vh;
          max-height: 40vh !important;
        }

        ark-grid-item {
          height: 40vh;
          max-height: 40vh !important;
          overflow: auto;
        }

        ark-grid>* {
          background: rgba(0, 0, 255, .1);
        }
      </style>

      <ark-grid cols="1" gap="5px">

        <ark-grid-item>
          <ark-grid cols="3" gap="5px">

            <ark-dragdrop droppable>
              <ark-dragdrop draggable>
                <h1>dragdrop 1</h1>
              </ark-dragdrop>

              <ark-dragdrop draggable>
                <h1>dragdrop 2</h1>
              </ark-dragdrop>

              <ark-dragdrop draggable>
                <h1>dragdrop 4</h1>
              </ark-dragdrop>

              <ark-dragdrop draggable>
                <h1>dragdrop 5</h1>
              </ark-dragdrop>
            </ark-dragdrop>

            <ark-dragdrop droppable>
              <ark-dragdrop draggable>
                <h1>dragdrop 3</h1>
              </ark-dragdrop>
            </ark-dragdrop>

            <ark-dragdrop droppable>
              <ark-dragdrop>
                <h1>HEADER</h1>

                <ark-dragdrop droppable>
                  <ark-dragdrop draggable>
                    <h1>dragdrop 6</h1>
                  </ark-dragdrop>
                  <ark-dragdrop draggable>
                    <h1>dragdrop 7</h1>
                  </ark-dragdrop>
                </ark-dragdrop>

              </ark-dragdrop>
            </ark-dragdrop>

          </ark-grid>
        </ark-grid-item>


        <ark-grid-item>
          <ark-grid cols="3" gap="5px">

            <ark-dragdrop droppable></ark-dragdrop>
            <ark-dragdrop droppable></ark-dragdrop>
            <ark-dragdrop droppable></ark-dragdrop>

          </ark-grid>
        </ark-grid-item>

      </ark-grid>
    `
  }

  get doc () {
    return ''
  }
}
customElements.define('demo-dragdrop', DragDropDemo)
