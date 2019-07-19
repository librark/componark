import { Component } from '../../component'

export class ListItem extends Component {
  init (context) {
    this.data = context['data'] || null
    this.template = context['template'] || (data => `${data}`)

    return super.init()
  }

  render () {
    if (this.data) {
      this.innerHTML = this.template(this.data)
      this.addEventListener('click', this._onSelected.bind(this))
    }
    return super.render()
  }

  /** @param {Event} event */
  _onSelected (event) {
    event.stopImmediatePropagation()

    this.dispatchEvent(
      new CustomEvent('list-item:selected', {
        detail: {
          data: this.data
        }
      })
    )
  }
}
customElements.define('ark-list-item', ListItem)
