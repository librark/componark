import '../../../../components/button'
import '../../../../components/icon'

export class ButtonDemo extends HTMLElement {
  connectedCallback () {
    this.render()
  }
  render () {
    this.innerHTML = /* html */`
      <div class="demo-button">
          <p>This is a button</p>

          <ark-button background="disabled" disabled>disabled</ark-button>
          <ark-button background="primary">primary</ark-button>
          <ark-button background="secondary">secondary</ark-button>
          <ark-button background="success">success</ark-button>
          <ark-button background="danger">danger</ark-button>
          <ark-button background="warning">warning</ark-button>
          <ark-button background="info">info</ark-button>
          <ark-button background="dark">dark</ark-button>
          <ark-button background="muted">muted</ark-button>
          <ark-button background="light">light</ark-button>
          <ark-button background="white">white</ark-button>

          <ark-button background="dark" color="danger">dark, danger</ark-button>
          <ark-button background="light" color="primary">
            lite, primary
          </ark-button>
      </div>

      <div class="demo-button">
          <p>This is a button</p>

          <ark-button outline="disabled" disabled>disabled</ark-button>
          <ark-button outline="primary">primary</ark-button>
          <ark-button outline="secondary">secondary</ark-button>
          <ark-button outline="success">success</ark-button>
          <ark-button outline="danger">danger</ark-button>
          <ark-button outline="warning">warning</ark-button>
          <ark-button outline="info">info</ark-button>
          <ark-button outline="dark">dark</ark-button>
          <ark-button outline="muted">muted</ark-button>
          <ark-button outline="light">light</ark-button>
          <ark-button outline="white">white</ark-button>
      </div>
    `
  }
}
customElements.define('demo-button', ButtonDemo)
