import { Component } from '../../component'
import { getSlots } from '../../../utils'

export class Sidebar extends Component {
	init (context = {}) {
		// local variables
		this.slots = getSlots(this)
		return super.init()
	}

	reflectedProperties () {
		return ['opened']
	}

	render () {
		this.innerHTML = /* html */`
      <div class="ark-sidebar__menu">
        <div>
          ${this._getContent('header', `ark-sidebar__header`)}
          <div class="ark-sidebar__body">
          ${this._getSlots('general')}
          </div>
        </div>
        ${this._getContent('footer', `ark-sidebar__footer`)}
      </div>
      <div class="ark-sidebar__scrim" listen on-click="close">
        ${this._getSlots('scrim')}
      </div>
    `

		if (this.hasAttribute('opened')) this.open()

		return super.render()
	}

	open () {
		this.classList.add(`ark-sidebar--opened`)
	}

	close () {
		this.classList.remove(`ark-sidebar--opened`)
	}

	toggle () {
		this.classList.toggle(`ark-sidebar--opened`)
	}

	// ---------------------------------------------------------------------------
	/** @returns {Object} */
	get slots () {
		return this._slots || {}
	}

	/** @param {Object} value */
	set slots (value) {
		this._slots = Object.keys(this._slots || {}).length ? this._slots : value
	}

	// ---------------------------------------------------------------------------

	_getContent (key, className) {
		const slots = this._getSlots(key)

		if (slots === '') { return '' }

		return /* html */`
      <div class="${className}">
        ${slots}
      </div>
    `
	}

	_getSlots (key) {
		if (!this.slots[key]) { return '' }

		return /* html */`
        ${this.slots[key].map((element, index) => `
          ${element.outerHTML}
        `).join('')}
      `
	}
}
customElements.define('ark-sidebar', Sidebar)
