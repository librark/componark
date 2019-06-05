import { Alert } from '../../../components/alert'

export class alertDemo extends HTMLElement {
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

    this._listen(this)
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

      this._listen(main)

      app.parentNode.removeChild(app)
      frameBody.prepend(main)
    }

    this.querySelector(selector).appendChild(frame)
  }

  _listen (main) {
    const open = main.querySelector('[btn-open]')
    open.addEventListener('click', _ => {
      Alert.launch({
        title: 'Title....',
        text: 'Text ....',
        confirmButtonText: 'Confirm',
        confirmButtonBackground: 'info',
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        cancelButtonBackground: 'dark',
        horizontal: 'start',
        vertical: 'start'
      }, main)
    })
  }

  _setupContent () {
    return /* html */`
      <div>
        <p>This is a alert.</p>
        <button btn-open>open</button>
        <!-- <button btn-toggle>toggle</button> -->
      </div>

      <!-- <ark-alert>
        <span>My Alert</span>
        <ark-button slot="action">Aceptar</ark-button>
      </ark-alert> -->

      <!-- DOCUMENTATION -->

      <div>
        <h3>ark-button</h3>
        <small>Attributes:</small>
        <hr />
        <p>horizontal, vertical:</p>
        <ul>
          <li>center </li>
          <li>start</li>
          <li>end</li>
        </ul>
      </div>
    `
  }
}
customElements.define('demo-alert', alertDemo)
