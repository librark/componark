import { Component } from 'base/component'

export class NavbarDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.content = /* html */ `
      <ark-navbar background="dark" color="danger" justify="between">

        <ark-nav brand>
          <ark-button>
            <ark-icon name='fas fa-bars'></ark-icon>
          </ark-button>
          <span>Componark</span>
        </ark-nav>

        <ark-nav background="secondary" color="success">
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
          <ark-button>
            <ark-icon name='fas fa-ellipsis-v'></ark-icon>
          </ark-button>
        </ark-nav>

      </ark-navbar>
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
Component.define('demo-navbar', NavbarDemo)
