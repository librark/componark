import { Component } from '../../loader'

export class NavbarDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `${this.styles}
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
          <span>Element D</span>
          <span>Element E</span>
        </ark-nav>

        <ark-nav toggler>
          <span>User</span>
          <ark-button navbar-toggler>
            <ark-icon name='fas fa-ellipsis-v'></ark-icon>
          </ark-button>
        </ark-nav>

      </ark-navbar>

      <!-- DOCUMENTATION -->
      <div class="content-body">
        <h3>ark-navbar</h3>
        <small>Attributes:</small>
        <p>fixed-top</p>
        <hr/>
        <small>Justify:</small>
        <p>center</p>
        <p>end</p>
        <p>between</p>

        <h3>ark-nav</h3>
        <small>Attributes:</small>
        <p>data-ark-navbar-toggle</p>
      </div>
    `

    return super.render()
  }

  get styles () {
    return /* html */`
      <style>
        demo-navbar{
          display: grid;
          grid: auto 1fr / 1fr;
          width: 100%;
          height: 100%;
        }

        .content-body{
          overflow: auto;
        }
      </style>
    `
  }
}
customElements.define('demo-navbar', NavbarDemo)
