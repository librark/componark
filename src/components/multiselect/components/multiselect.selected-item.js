import { Component } from '../../component'

export class MultiselectSelectedItem extends Component {
  /**
   * @param {{
   *  field: string
   *  title: string
   * }} context
   **/
  init (context) {
    this.field = context.field || ''
    this.title = context.title || ''
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `
			<small>${this.title}</small>
      <button remove>&times;</button>
    `
    this.setAttribute('field', this.field)
    return super.render()
  }
}
customElements.define('ark-multiselect-selected-item', MultiselectSelectedItem)
