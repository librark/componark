import { Component } from '../components'

export class RadioDemo extends Component {
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
      <ark-radio-group listen on-alter="radioGroup" label="Radio Buttons">
        <ark-radio-button value="op1">Opcion 1</ark-radio-button>
        <ark-radio-button value="op2">Opcion 2</ark-radio-button>
        <ark-radio-button value="op3">Opcion 3</ark-radio-button>
      </ark-radio-group>


      <p>Valor seleccionado: <span data-radio-button-value></span></p>
    `
  }

  radioGroup (event) {
    this.querySelector(
      '[data-radio-button-value]').innerHTML = event.detail.value || ''
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

  // _listen (main) {
  //   const radioGroup = main.querySelector('ark-radio-group')
  //   radioGroup.addEventListener('click', () => {
  //     main.querySelector(
  //       '[data-radio-button-value]'
  //     ).innerHTML = radioGroup['value']
  //   })
  // }
}
customElements.define('demo-radio', RadioDemo)
