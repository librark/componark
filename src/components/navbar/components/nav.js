import { Component } from '../../../base/component'

const tag = 'ark-nav'
export class Nav extends Component {
  init(context = {}) {
    this.binding = 'nav:listen'
    return super.init(context)
  }

  toggleVisibility () {
    if (!(this.hasAttribute('brand') || this.hasAttribute('toggler'))) {
      this.toggleAttribute('collapse')
    }
  }
}
Component.define(tag, Nav)
