// @ts-ignore
import Image from './assets/logo.png'
import '../../../../components/navbar'

export class NavbarDemo extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
      <div>
          <p>This is a navbar.</p>
          <hr/>
      </div>

      <ark-navbar>

        <ark-navbar-header>
          <ark-navbar-header-toggler></ark-navbar-header-toggler>

          <ark-navbar-header-brand>
            <ark-navbar-header-brand-image src="${Image}">
            </ark-navbar-header-brand-image>

            <ark-navbar-header-brand-title>
              {ok titulo}
            </ark-navbar-header-brand-title>
          </ark-navbar-header-brand>
        </ark-navbar-header>

        <ark-navbar-body>
          <ark-navbar-body-nav>
            <ark-navbar-body-nav-item>item 1</ark-navbar-body-nav-item>
            <ark-navbar-body-nav-item>item 2</ark-navbar-body-nav-item>
            <ark-navbar-body-nav-item>item 3</ark-navbar-body-nav-item>
          </ark-navbar-body-nav>
        </ark-navbar-body>

      </ark-navbar>
    `
  }
}
customElements.define('demo-navbar', NavbarDemo)
