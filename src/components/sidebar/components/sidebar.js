import { Component } from '../../component'
import { getSlots } from '../../../utils'

export class Sidebar extends Component {
	init (context = {}) {
		// local variables
		this.slots = this.slots || getSlots(this)

		return super.init()
	}

	reflectedProperties () {
		return ['opened']
	}

	render () {
		this.innerHTML = /* html */`
      <div class="ark-sidebar__menu">

        <div>
          ${this._getContent('header', 'ark-sidebar__header')}

          <div class="ark-sidebar__body">
            ${this._getSlots('general')}
          </div>
        </div>

        ${this._getContent('footer', 'ark-sidebar__footer')}

      </div>
      <div class="ark-sidebar__scrim" listen on-click="close"></div>
    `

		if (this.hasAttribute('opened')) this.open()

		return super.render()
	}

	open () {
		this.classList.add('ark-sidebar--opened')
	}

	close () {
		this.classList.remove('ark-sidebar--opened')
	}

	toggle () {
		this.classList.toggle('ark-sidebar--opened')
	}

	_getContent (key, className) {
		const slots = this._getSlots(key)

		if (slots === '') { return '' }

		return /* html */`<div class="${className}">${slots}</div>`
	}

	_getSlots (key) {
		if (!this.slots || !this.slots[key]) return ''

		return /* html */ `
        ${this.slots[key].map(element => `${element.outerHTML}`).join('')}
      `.trim()
	}
}
customElements.define('ark-sidebar', Sidebar)
