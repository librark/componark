import { Component } from '../components'

export class CheckboxDemo extends Component {
  init (context) {
    this.type = context['type'] || 'ark'
    return super.init()
  }

  render () {
    this.innerHTML = /* html */`
      <!-- <div>
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
      </div> -->

      <div data-display style="border: 1px solid;">
        ${this._setupContent()}
      </div>


      <!-- DOCUMENTATION -->
    `
    this._setup()
    return super.render()
  }

  _setup () {
    // this._setupFrame('[data-mobile]')
    // this._setupFrame('[data-tablet]')
    // this._setupFrame('[data-desktop]')
    // this._listen(this)
  }

  _setupContent () {
    return /* html */`
      <ark-checkbox-group listen on-alter="checkboxGroup" label="Checkboxs">
        <ark-checkbox value="op1">Opcion 1</ark-checkbox>
        <ark-checkbox value="op2">Opcion 2</ark-checkbox>
        <ark-checkbox value="op3">Opcion 3</ark-checkbox>
      </ark-checkbox-group>

      <p>Valor seleccionado: <span data-checkbox-value></span></p>
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

      // this._listen(main)

      app.parentNode.removeChild(app)
      frameBody.prepend(main)
    }
  }

  checkboxGroup (event) {
    this.querySelector(
      '[data-checkbox-value]').innerHTML = event.detail.value || ''
  }

  // _listen (main) {
  //   const checkboxGroup = main.querySelector('ark-checkbox-group')
  //   checkboxGroup.addEventListener('click', () => {
  //     main.querySelector(
  //       '[data-checkbox-value]'
  //     ).innerHTML = checkboxGroup['value']
  //   })
  // }
}
customElements.define('demo-checkbox', CheckboxDemo)
