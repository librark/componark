import { Component } from '../../../base/component'
import { styles } from '../styles'

const tag = 'ark-navbar'
export class Navbar extends Component {
  init(context = {}) {
    this.binding = 'navbar:listen'
    return super.init(context)
  }

  render () {
    this.querySelectorAll('[toggler]').forEach(toggler => {
      toggler.addEventListener('click', this.onToggleContent.bind(this))
    })
    return super.render()
  }

  /** @param {event} event */
  onToggleContent (event) {
    event.stopPropagation()
    this.selectAll('.ark-nav').forEach(nav => {
      nav['toggleVisibility']()
    })
  }
}
Component.define(tag, Navbar, styles)
