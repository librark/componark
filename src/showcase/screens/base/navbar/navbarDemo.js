import { Component } from '../../loader'

export class NavbarDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `
      <ark-navbar background="dark" color="danger" justify="between">

        <ark-nav brand>
          <ark-button>
            <ark-icon name='fas fa-bars'></ark-icon>
          </ark-button>
          <span>Componark</span>
        </ark-nav>

        <ark-nav>
          <span>Element 1</span>
          <span>Element 2</span>
          <span>Element 3</span>
        </ark-nav>

        <ark-nav>
          <span>Element A</span>
          <span>Element B</span>
          <span>Element C</span>
        </ark-nav>

        <ark-nav toggler>
          <span>User</span>
          <ark-button navbar-toggler>
            <ark-icon name='fas fa-ellipsis-v'></ark-icon>
          </ark-button>
        </ark-nav>

      </ark-navbar>

      <!-- DOCUMENTATION -->

      <div>
        <h3>ark-navbar</h3>
        <small>Attributes:</small>
        <p>fixed-top</p>
        <hr/>
        <small>Justify:</small>
        <p>center</p>
        <p>end</p>
        <p>between</p>
      </div>
      <div>
        <h3>ark-nav</h3>
        <small>Attributes:</small>
        <p>data-ark-navbar-toggle</p>
      </div>
    `

    return super.render()
  }
}
customElements.define('demo-navbar', NavbarDemo)
