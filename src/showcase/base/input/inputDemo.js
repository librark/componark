export class InputDemo extends HTMLElement {
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
      ${this.doc}
    `
    this._setupFrame('[mobile]', '360px')
    this._setupFrame('[tablet]', '768px')
    this._setupFrame('[desktop]', '960px')
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

      app.parentNode.removeChild(app)
      frameBody.prepend(main)
    }

    this.querySelector(selector).appendChild(frame)
  }

  _setupContent () {
    return /* html */`
      <style>
        main{
          padding: 10px;
        }
      </style>

      <p>input item</p>

      <ark-input type="date">
        <label slot="label">date</label>
        <label slot="alert">alert date</label>
        <label slot="alert">alert date 2</label>
      </ark-input>
      <ark-input type="datetime-local">
        <label slot="label">datetime-local</label>
        <label slot="alert">alert datetime-local</label>
      </ark-input>
      <ark-input type="email">
        <label slot="label">email</label>
        <label slot="alert">alert email</label>
      </ark-input>
      <ark-input type="hidden">
        <label slot="label">hidden</label>
        <label slot="alert">alert hidden</label>
      </ark-input>
      <ark-input type="month">
        <label slot="label">month</label>
        <label slot="alert">alert month</label>
      </ark-input>
      <ark-input type="number">
        <label slot="label">number</label>
        <label slot="alert">alert number</label>
      </ark-input>
      <ark-input type="password">
        <label slot="label">password</label>
        <label slot="alert">alert password</label>
      </ark-input>
      <ark-input type="search">
        <label slot="label">search</label>
        <label slot="alert">alert search</label>
      </ark-input>
      <ark-input type="tel">
        <label slot="label">tel</label>
        <label slot="alert">alert tel</label>
      </ark-input>
      <ark-input type="text">
        <label slot="label">text</label>
        <label slot="alert">alert text</label>
      </ark-input>
      <ark-input type="time">
        <label slot="label">time</label>
        <label slot="alert">alert time</label>
      </ark-input>
      <ark-input type="url">
        <label slot="label">url</label>
        <label slot="alert">alert url</label>
      </ark-input>
      <ark-input type="week">
        <label slot="label">week</label>
        <label slot="alert">alert week</label>
      </ark-input>
    `
  }

  get doc () {
    return /* html */`
      <br/>
      <hr/>
      <p>supported types</p>
      <ul>
        <li>date</li>
        <li>datetime-local</li>
        <li>email</li>
        <li>hidden</li>
        <li>month</li>
        <li>number</li>
        <li>password</li>
        <li>search</li>
        <li>tel</li>
        <li>text</li>
        <li>time</li>
        <li>url</li>
        <li>week</li>
      </ul>
    `
  }
}
customElements.define('demo-input', InputDemo)
