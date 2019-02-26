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
        <hr />
      </div>

      <ark-navbar fixed-top>
        <!-- header -->
        <ark-navbar-header>

          <!-- toggler -->
         <ark-navbar-header-toggler></ark-navbar-header-toggler>

          <!-- brand -->
          <ark-navbar-header-brand>

            <!-- brand-image -->
            <ark-navbar-header-brand-image src="${Image}">
            </ark-navbar-header-brand-image>

            <!-- brand-title -->
            <ark-navbar-header-brand-title>
              Nubark
            </ark-navbar-header-brand-title>
          </ark-navbar-header-brand>
        </ark-navbar-header>

        <!-- body -->
        <ark-navbar-body justify-content-between>

          <!-- nav -->
          <ark-navbar-body-nav>
            <ark-navbar-body-nav-item>item 1</ark-navbar-body-nav-item>
            <ark-navbar-body-nav-item>item 2</ark-navbar-body-nav-item>
            <ark-navbar-body-nav-item>item 3</ark-navbar-body-nav-item>
          </ark-navbar-body-nav>

          <!-- nav -->
          <ark-navbar-body-nav >
            <ark-navbar-body-nav-item>my_Item 1</ark-navbar-body-nav-item>
            <ark-navbar-body-nav-item>my_Item 2</ark-navbar-body-nav-item>
            <ark-navbar-body-nav-item>my_Item 3</ark-navbar-body-nav-item>
          </ark-navbar-body-nav>

          <!-- nav -->
          <ark-navbar-body-nav>
            <ark-navbar-body-nav-item>x_Item 1</ark-navbar-body-nav-item>
            <ark-navbar-body-nav-item>x_Item 2</ark-navbar-body-nav-item>
            <ark-navbar-body-nav-item>x_Item 3</ark-navbar-body-nav-item>
          </ark-navbar-body-nav>
        </ark-navbar-body>

      </ark-navbar>

      <div>
        <h3>ark-navbar</h3>
        <small>Attributes:</small>
        <p>fixed-top</p>
      </div>
      <div>
        <h3>ark-navbar-body</h3>
        <small>Attributes:</small>
        <p>justify-content-center</p>
        <p>justify-content-end</p>
        <p>justify-content-between</p>
      </div>
    `
  }
}
customElements.define('demo-navbar', NavbarDemo)
