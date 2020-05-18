/** @typedef {import('./checkbox').Checkbox} Checkbox */
import { Component } from '../../component'

export class CheckboxGroup extends Component {
	init (context = {}) {
		this.label = context.label

		// local variables
		this.defaultContent = this.defaultContent || this.innerHTML

		return super.init()
	}

	reflectedProperties () {
		return ['label']
	}

	render () {
		this.innerHTML = /* html */ `
      <div class="ark-checkbox-group__label">
        <small data-checkbox-group-label>${this.label}</small>
      </div>
      <div>
        <div data-checkbox-list class="ark-checkbox-group__list"></div>
        <div class="ark-checkbox-group__alert">
          ${this.defaultContent}
        </div>
      </div>
    `

		this._renderCheckboxList()
		return super.render()
	}

	load () {
		this.addEventListener('checkbox:alter', this.onAlter.bind(this))
		return super.load()
	}

	// ---------------------------------------------------------------------------

	get value () {
		const values = []
		this.selectAll('ark-checkbox[checked]').forEach((
			/** @type {Checkbox} */ checkbox
		) => {
			values.push(checkbox.value)
		})

		return values
	}

	/** @param {CustomEvent} event */
	onAlter (event) {
		event.stopImmediatePropagation()

		this.dispatchEvent(
			new CustomEvent('alter', {
				detail: {
					value: this.value,
					origin: event
				}
			})
		)
	}

	// ---------------------------------------------------------------------------

	_renderCheckboxList () {
		const container = this.querySelector('[data-checkbox-list]')
		const checkboxList = this.selectAll('ark-checkbox')

		checkboxList.forEach(checkbox => {
			container.appendChild(checkbox)
		})
	}
}
customElements.define('ark-checkbox-group', CheckboxGroup)
