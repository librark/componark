import { Component } from 'components/component'

export class Nav extends Component {
  init (context = {}) {
    return super.init()
  }

  render () {
    if (!(this.hasAttribute('brand') || this.hasAttribute('toggler'))) {
      this.setAttribute('collapse', 'true')
    }

    return super.render()
  }

  toggleHide () {
    if (!this.hasAttribute('collapse')) return

    if (this.style.display === 'none' || this.style.display === '') {
      this.style.display = 'flex'
    } else {
      this.style.display = 'none'
    }
  }
}
customElements.define('ark-nav', Nav)
