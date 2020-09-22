import { Component } from '../../loader'

export class ButtonDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `
      <div class="demo-button">
        <p>Vibrate</p>

        <ark-button background="primary" vibrate️>
          Vibrate for 200 ms
        </ark-button>
        <ark-button background="primary" vibrate️="600">
          Vibrate for 600 ms
        </ark-button>
        <ark-button background="primary" vibrate️="100 200 200 200 500">
          Vibrate with pattern
        </ark-button>
      </div>

      <div class="demo-button">
        <p>This is a button</p>

        <ark-button background="disabled" disabled>DISABLED</ark-button>
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

        <ark-button outline="disabled" disabled>Disabled</ark-button>
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

        <ark-button fab background="primary">
          <ark-icon name="fas fa-address-book"></ark-icon>
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
        <br/>
        <h3>Fab</h3>
        <small>Default attributes:</small>
        <ul>
          <li>horizontal: end</li>
          <li>vertical: end</li>
        </ul>
      </div>
    `

    return super.render()
  }
}
customElements.define('demo-button', ButtonDemo)
