import { Component } from '../../component'

export class RadioButton extends Component {
	/** @param {Object} context? */
	init (context = {}) {
		this.name = context.name
		this.value = context.value
		this.checked = context.checked

		// local variables
		this.defaultContent = this.defaultContent || this.innerHTML

		return super.init()
	}

	reflectedProperties () {
		return ['name', 'value']
	}

	render () {
		this.innerHTML = /* html */ `
      <div class="ark-radio-button__button">
        <input data-input type="radio">
      </div>
      <div class="ark-radio-button__label">
        <small>${this.defaultContent}</small>
      </div>
    `

		this._moveAttributes()
		return super.render()
	}

	check () {
		this.checked = true
	}

	unCheck () {
		this.checked = false
	}

	toggle () {
		this.checked = !this.checked
	}

	/** @returns {Boolean} */
	get checked () {
		return this.hasAttribute('checked')
	}

	/** @param {Boolean} value */
	set checked (value) {
		if (!this.input) return

		this.input.checked = value

		if (value) {
			this.setAttribute('checked', '')
			this.input.setAttribute('checked', 'checked')
		} else {
			this.removeAttribute('checked')
			this.input.removeAttribute('checked')
		}
	}

	/** @returns {HTMLInputElement} */
	get input () {
		return this.querySelector('[data-input]')
	}

	_moveAttributes () {
		this.checked = this.hasAttribute('checked')
		const element = this.querySelector('[data-input]')
		const attributes = Array.from(this.attributes)

		attributes.forEach(attribute => {
			if (this._defaultAttributes().find(item => item === attribute.name)) {
				element.setAttribute(attribute.name, attribute.value)
				this.removeAttribute(attribute.name)
			}
		})
	}

	/** @return {Array<string>} */
	_defaultAttributes () {
		return [
			'accept',
			'alt',
			'autocomplete',
			'autofocus',
			'dirname',
			'disabled',
			'form',
			'formaction',
			'formenctype',
			'formmethod',
			'formnovalidate',
			'formtarget',
			'list',
			'min',
			'multiple',
			'name',
			'pattern',
			'placeholder',
			'readonly',
			'required',
			'size',
			'src',
			'step'
		]
	}
}
customElements.define('ark-radio-button', RadioButton)
