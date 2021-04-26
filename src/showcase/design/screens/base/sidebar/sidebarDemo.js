import { Component } from 'base/component'

export class SidebarDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.content = /* html */`
      <div>
        <p>This is a sidebar.</p>
        <ark-button listen on-click="_onClick" background="primary">
          OPEN
        </ark-button>
      </div>

      <ark-sidebar>
        <div slot="header">My Menu</div>
        <div>body</div>
        <div slot="footer">footer</div>
      </ark-sidebar>

      <a target="_blank" href="https://github.com/knowark/componark/blob/master/src/components/navbar/README.rst">
      * Reference
      </a>
    `

    return super.render()
  }

  _onClick (event) {
    const sidebar = this.querySelector('ark-sidebar')
    sidebar['open']()
  }
}
Component.define('demo-sidebar', SidebarDemo)
