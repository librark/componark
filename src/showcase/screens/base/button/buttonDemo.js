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
            <ark-button>Super</ark-button>
            <ark-button>Hyper</ark-button>
            <ark-button>Mega</ark-button>
            <ark-button>Chevere</ark-button>
        </div>
        `
  }
}
customElements.define('demo-button', ButtonDemo)
