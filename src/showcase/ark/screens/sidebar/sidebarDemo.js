// @ts-ignore
import '../../../../components/sidebar'

export class SidebarDemo extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
        <div>
            <p>This is a sidebar.</p>
            <hr/>
            <button>OPEN!</button>
        </div>
        <ark-sidebar opened>
            <ark-sidebar-content>

                <ark-sidebar-content-header>
                    <ark-sidebar-content-header-title>
                        titulo xxx
                    </ark-sidebar-content-header-title>
                    <ark-sidebar-content-header-subtitle>
                        subtitulo xxx
                    </ark-sidebar-content-header-subtitle>
                </ark-sidebar-content-header>

                <ark-sidebar-content-body>
                    <div>
                        div>body
                    </div>
                </ark-sidebar-content-body>

            </ark-sidebar-content>
            <ark-sidebar-scrim></ark-sidebar-scrim>
        </ark-sidebar>
    `
    this._bind()
    this._listen()
  }

  _bind () {
    this.openButton = this.querySelector('button')
    this.sidebar = (
      /** @type {import('../../../../components/sidebar').Sidebar} */(
        this.querySelector('ark-sidebar')
      )
    )
  }

  _listen () {
    this.openButton.addEventListener('click', () => this.sidebar.open())
  }
}
customElements.define('demo-sidebar', SidebarDemo)
