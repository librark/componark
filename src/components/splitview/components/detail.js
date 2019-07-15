import { Component } from '../../component'

export class SplitviewDetail extends Component {
  init (context) {
    this.template = context['template'] || this.template || null
    this.item = context['item'] || this.item || null
    return super.init(context)
  }

  render () {
    if (this.template && this.item) {
      this.innerHTML = this.template(this.item)
    }
    return super.render()
  }
}
customElements.define('ark-splitview-detail', SplitviewDetail)
