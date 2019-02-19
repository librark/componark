import '../../../../components/button'

export class ButtonDemo extends HTMLElement {
  connectedCallback () {
    this.root = this
    this.render()
  }
  render () {
    this.root.innerHTML = /* html */`
        <div class="demo-button">
            <p>This is a button</p>
            <ark-button></ark-button>
            <ark-button></ark-button>
            <ark-button></ark-button>
            <ark-button></ark-button>
            <ark-button></ark-button>
        </div>
        `
  }
}
customElements.define('demo-button', ButtonDemo)
