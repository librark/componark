export class SelectDemo extends HTMLElement {
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

      app.parentNode.removeChild(app)
      frameBody.prepend(main)
    }

    this.querySelector(selector).appendChild(frame)
  }

  _setupContent () {
    return /* html */`
      <div>
        <p>This is a select.</p>
      </div>
      <ark-select placeholder="my select">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </ark-select>
    `
  }
}
customElements.define('demo-select', SelectDemo)
