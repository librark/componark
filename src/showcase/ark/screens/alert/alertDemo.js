import '../../../../components/alert'
import '../../../../components/button'

export class alertDemo extends HTMLElement {
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

  _lisen (main) {
    const open = main.querySelector('[btn-open]')
    open.addEventListener('click', _ => {
      main.querySelector('ark-alert').open()
    })

    const toggle = main.querySelector('[btn-toggle]')
    toggle.addEventListener('click', _ => {
      main.querySelector('ark-alert').toggle()
    })
  }

  _setupContent () {
    return /* html */`
      <div>
        <p>This is a alert.</p>
        <button btn-open>open</button>
        <button btn-toggle>toggle</button>
      </div>
      <ark-alert background="primary">
        <ark-alert-title>titulo</ark-alert-title>
        <ark-alert-subtitle>subtitulo</ark-alert-subtitle>

        <div>contenido</div>

        <ark-button slot="action">Aceptar</ark-button>
        <ark-button slot="action" hide>Cerrar</ark-button>
      </ark-select>
    `
  }
}
customElements.define('demo-alert', alertDemo)
