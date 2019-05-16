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
      ${this._getStyle()}
      ${this._setupContent()}
      ${this._getDoc()}
    `
    // this._setupFrame('[mobile]', '360px')
    // this._setupFrame('[tablet]', '768px')
    // this._setupFrame('[desktop]', '960px')
  }

  _setupContent () {
    return /* html */`
      <ark-grid cols="1" gap="5px">

        <ark-grid-item>
          <ark-grid cols="3" gap="5px">

            <ark-dragdrop droppable>
              <ark-dragdrop draggable>
                <h4>dragdrop 1</h4>
              </ark-dragdrop>

              <ark-dragdrop draggable>
                <h4>dragdrop 2</h4>
              </ark-dragdrop>

              <ark-dragdrop draggable>
                <h4>dragdrop 4</h4>
              </ark-dragdrop>

              <ark-dragdrop draggable>
                <h4>dragdrop 5</h4>
              </ark-dragdrop>
            </ark-dragdrop>

            <ark-dragdrop droppable>
              <ark-dragdrop draggable>
                <h4>dragdrop 3</h4>
              </ark-dragdrop>
            </ark-dragdrop>

            <ark-dragdrop droppable>

              <h1>PAPA</h1>
              <ark-dragdrop draggable level="1">
                <h4>HEADER</h4>

                <ark-dragdrop droppable>
                  <ark-dragdrop draggable>
                    <h4>dragdrop 6</h4>
                  </ark-dragdrop>
                  <ark-dragdrop draggable>
                    <h4>dragdrop 7</h4>
                  </ark-dragdrop>
                </ark-dragdrop>

              </ark-dragdrop>

              <ark-dragdrop draggable level="1">
                <h4>HEADER 2</h4>

                <ark-dragdrop droppable>
                  <ark-dragdrop draggable>
                    <h4>dragdrop 6</h4>
                  </ark-dragdrop>
                  <ark-dragdrop draggable>
                    <h4>dragdrop 7</h4>
                  </ark-dragdrop>
                </ark-dragdrop>

              </ark-dragdrop>
            </ark-dragdrop>

          </ark-grid>
        </ark-grid-item>

        <ark-grid-item>
          <ark-grid cols="1" gap="5px">

          <ark-dragdrop droppable direction="row">
            <ark-dragdrop>
              <h4>dragdrop 8</h4>
            </ark-dragdrop>
            <ark-dragdrop>
              <h4>dragdrop 9</h4>
            </ark-dragdrop>
            <ark-dragdrop>
              <h4>dragdrop 0</h4>
            </ark-dragdrop>
          </ark-dragdrop>

          </ark-grid>
        </ark-grid-item>

      </ark-grid>
    `
  }

  _getStyle () {
    return /* html */`
      <style>
        ark-grid>* {
          background: rgba(0, 0, 255, .1);
        }

        ark-grid{
          width: 80vw;
        }

        ark-grid-item{
          height: 40vh;
        }
      </style>
    `
  }

  _getDoc () {
    return /* html */`
      <h4>default</h4>
      <ul>
        <li>[draggable] ark-dragdrop</li>
        <li>[direction] column</li>
      </ul>

      <h4>Attributes</h4>
      <ul>
        <li>draggable || droppable</li>
        <li>[direction]: column || row </li>
      </ul>
    `
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
}
customElements.define('demo-dragdrop', DragDropDemo)
