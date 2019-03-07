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
        <p>This is a outline button</p>

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

      <div class="demo-button">
        <p>This is a link</p>
        <ark-button href="a" background="disabled" disabled>
          disabled
        </ark-button>
        <ark-button href="a" background="primary">primary</ark-button>
        <ark-button href="a" background="secondary">secondary</ark-button>
        <ark-button href="a" background="success">success</ark-button>
        <ark-button href="a" background="danger">danger</ark-button>
        <ark-button href="a" background="warning">warning</ark-button>
        <ark-button href="a" background="info">info</ark-button>
        <ark-button href="a" background="dark">dark</ark-button>
        <ark-button href="a" background="muted">muted</ark-button>
        <ark-button href="a" background="light">light</ark-button>
        <ark-button href="a" background="white">white</ark-button>
      </div>

      <div class="demo-button">
        <p>This is a outline link</p>
        <ark-button href="a" outline="disabled" disabled>
          disabled
        </ark-button>
        <ark-button href="a" outline="primary">primary</ark-button>
        <ark-button href="a" outline="secondary">secondary</ark-button>
        <ark-button href="a" outline="success">success</ark-button>
        <ark-button href="a" outline="danger">danger</ark-button>
        <ark-button href="a" outline="warning">warning</ark-button>
        <ark-button href="a" outline="info">info</ark-button>
        <ark-button href="a" outline="dark">dark</ark-button>
        <ark-button href="a" outline="muted">muted</ark-button>
        <ark-button href="a" outline="light">light</ark-button>
        <ark-button href="a" outline="white">white</ark-button>
      </div>


      <div class="demo-button">
        <p>This is a Fab Buttons</p>

        <ark-button fab background="disabled" disabled>
          <ark-icon name="fa-address-book"></ark-icon>
        </ark-button>
        <ark-button fab background="primary">
          <ark-icon name="fa-address-book"></ark-icon>
        </ark-button>
        <ark-button fab background="secondary">
          <ark-icon name="fa-address-book"></ark-icon>
        </ark-button>
        <ark-button fab background="success">
          <ark-icon name="fa-address-book"></ark-icon>
        </ark-button>
        <ark-button fab background="danger">
          <ark-icon name="fa-address-book"></ark-icon>
        </ark-button>
        <ark-button fab background="warning">
          <ark-icon name="fa-address-book"></ark-icon>
        </ark-button>
        <ark-button fab background="info">
          <ark-icon name="fa-address-book"></ark-icon>
        </ark-button>
        <ark-button fab background="dark">
          <ark-icon name="fa-address-book"></ark-icon>
        </ark-button>
        <ark-button fab background="muted">
          <ark-icon name="fa-address-book"></ark-icon>
        </ark-button>
        <ark-button fab background="light">
          <ark-icon name="fa-address-book"></ark-icon>
        </ark-button>
        <ark-button fab background="white">
          <ark-icon name="fa-address-book"></ark-icon>
        </ark-button>

        <ark-button fab horizontal="end" vertical="end" background="primary">
          <ark-icon name="fa-address-book"></ark-icon>
        </ark-button>

      </div>


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
customElements.define('demo-button', ButtonDemo)
