import { Component } from '../../../base/component'

const tag = 'ark-multiselect-input'

export class MultiselectInput extends Component {
  /** @param {{}} context */
  init (context) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `
      <input type="text" placeholder="Add" class="ark-multiselect__input"/>
		`
    return super.render()
  }

  get input () {
    return /** @type {HTMLInputElement} */(this.querySelector('input'))
  }

  get value () {
    return this.input.value
  }

  set value (value) {
    this.input.value = value
  }
}

Component.define(tag, MultiselectInput)
