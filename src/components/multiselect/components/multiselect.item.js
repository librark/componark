import { Component } from '../../component'

export class MultiselectItem extends Component {
	/**
	 * @param {{id, data,	template?}} context
	 */
  init(context) {
    this.data = context['data'] || null
    this.id = context['id'] || this.id
    this.template = context['template'] || (data => `${data}`)

    return super.init()
  }

  render() {
    this.innerHTML = /* html */ `
			<small>${this.template(this.data)}</small>
			<button listen listen on-click="_onRemove" remove>&times;</button>
		`
    return super.render()
  }

  reflectedProperties() {
    return ['id']
  }

  load() {
    return super.load()
  }

  // ---------------------------------------------------------------------------

  /** @param {boolean} value */
  set selected(value) {
    if (value) {
      this.setAttribute('selected', 'true')
    } else {
      this.removeAttribute('selected')
    }
  }

  /** @return {boolean} */
  get selected() {
    return this.hasAttribute('selected')
  }

  // ---------------------------------------------------------------------------

  /** @param {event} event */
  _onRemove(event) {
    event.stopImmediatePropagation()
    this.dispatchEvent(
      new CustomEvent('multiselect-item:remove', {
        bubbles: true,
        detail: {
          data: this.data
        }
      })
    )
  }
}
customElements.define('ark-multiselect-item', MultiselectItem)
