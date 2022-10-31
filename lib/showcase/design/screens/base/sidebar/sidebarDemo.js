import { Component } from 'base/component/index.js'

export class SidebarDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.content = /* html */ `
      <div>
        <p>This is a sidebar.</p>
        <ark-button listen on-click="_onClick" background="primary">
          OPEN
        </ark-button>
      </div>

      <ark-sidebar width="compact" gap padded side="left">
        <div slot="header">My Menu</div>
        <div fake-card>
          <h1>Fake Card</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, ipsa.</p>
          <button>submit</button>
        </div>
        <div fake-card>
          <h1>Fake Card</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, ipsa.</p>
          <button>submit</button>
        </div>
        <div fake-card>
          <h1>Fake Card</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, ipsa.</p>
          <button>submit</button>
        </div>
        <div fake-card>
          <h1>Fake Card</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, ipsa.</p>
          <button>submit</button>
        </div>
        <div slot="footer">footer</div>
      </ark-sidebar>

      <a 
        target="_blank" 
        href="https://github.com/knowark/componark/blob/master/lib/components/sidebar/README.md">
      * Reference
      </a>
    `

    return super.render()
  }

  _onClick(event) {
    const sidebar = this.querySelector('ark-sidebar')
    sidebar['open']()
  }
}

const styles = /*css*/ `
[fake-card] {
  border: 1px solid black;
  padding: 1rem;
}
`

Component.define('demo-sidebar', SidebarDemo, styles)
