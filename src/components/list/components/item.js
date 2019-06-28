import { Component } from '../../component'

export class ListItem extends Component {
  init (context) {
    this.index = this.index
    this.addEventListener('click', this._onSelected.bind(this))
    return super.init(context)
  }

  reflectedProperties () {
    return ['index']
  }

  _onSelected (event) {
    this.dispatchEvent(new CustomEvent('list-item:selected', {
      detail: {
        index: this.index
      }
    }))
  }
}
customElements.define('ark-list-item', ListItem)
