import { Component } from '../../component'

export class RadioButton extends Component {
	/**
   * @param {{ value:string, checked:boolean } | {}} context?
   */
	init (context = {}) {
		this.value = context['value']
		this.checked = context['checked']

		// local variables
		this.defaultContent = this.defaultContent || this.innerHTML

		return super.init()
	}

	reflectedProperties () {
		return ['value']
	}

	render () {
		this.innerHTML = /* html */ `
      <div class="ark-radio-button__body" listen on-click="_change">
        <div class="ark-radio-button__button">
          <input data-input type="radio">
        </div>
        <div class="ark-radio-button__label">
          <small>${this.defaultContent}</small>
        </div>
      </div>
    `

		this._moveAttributes()
		return super.render()
	}

	check () {
		this.checked = true
	}

	uncheck () {
		this.checked = false
	}

	toggle () {
		this.checked = !this.checked
	}

	// ---------------------------------------------------------------------------
	/** @returns {Boolean} */
	get checked () {
		return this.hasAttribute('checked')
	}

	/** @param {Boolean} value */
	set checked (value) {
		const input = this.querySelector('[data-input]')
		if (!input) return

		input['checked'] = value

		if (value) {
			this.setAttribute('checked', '')
			input.setAttribute('checked', 'checked')
		} else {
			this.removeAttribute('checked')
			input.removeAttribute('checked')
		}
	}

	// ---------------------------------------------------------------------------
	/** @param {Event} event */
	_change (event) {
		event.stopPropagation()
		this.toggle()

		this.dispatchEvent(
			new CustomEvent('alter', {
				detail: {
					value: this.value,
					origin: event
				}
			})
		)
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
