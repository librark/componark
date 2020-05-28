/** @typedef {import('./drop').DropZone} DropZone */

import {
	Component
} from '../../component'
import {
	uuidv4
} from '../../../utils'

export class DragZone extends Component {
	init (context = {}) {
		this.value = this.value || context.value

		// ------------------------------------------------------------------------
		// Local
		// ------------------------------------------------------------------------

		this.x = this.x
		this.y = this.y
		this.id = uuidv4()
		this.selected = false

		return super.init()
	}

	reflectedProperties () {
		return ['x', 'y', 'value']
	}

	render () {
		this.setAttribute('draggable', 'true')

		return super.render()
	}

	load () {
		// ------------------------------------------------------------------------
		// drag
		// ------------------------------------------------------------------------
		this.addEventListener('dragstart', this.onDraggableStart.bind(this))
		this.addEventListener('dragend', this.onDraggableEnd.bind(this))
		this.addEventListener('dragenter', this.onDraggableEnter.bind(this))
		this.addEventListener('dragleave', this.onDraggableLeave.bind(this))

		// ------------------------------------------------------------------------
		// click
		// ------------------------------------------------------------------------
		this.addEventListener('click', this.onClick.bind(this))

		// ------------------------------------------------------------------------

		this.setPosition()
	}

	// --------------------------------------------------------------------------

	/** @param {event} event */
	onDraggableStart (event) {
		event.stopImmediatePropagation()
		this.dispatchEvent(new CustomEvent('drag:dragstart', {
			bubbles: true
		}))

		this.selected = true

		this.classList.add('ark-zone-drag--dragging')
		setTimeout(_ => this.classList.add('ark-zone-drag--hidden'))
	}

	/** @param {event} event */
	onDraggableEnd (event) {
		event.stopImmediatePropagation()

		this._draggableRemoveStyle()

		this.render()
		this.selected = false

		this.classList.remove('ark-zone-drag--dragging')
		setTimeout(_ => this.classList.remove('ark-zone-drag--hidden'))

		this.dispatchEvent(new CustomEvent('drag:dragend', {
			bubbles: true
		}))
	}

	/** @param {event} event */
	onDraggableEnter (event) {
		event.stopImmediatePropagation()

		this.classList.add('ark-zone-drag--enter')

		this.dispatchEvent(new CustomEvent('drag:dragenter', {
			bubbles: true
		}))
	}

	/** @param {event} event */
	onDraggableLeave (event) {
		event.stopImmediatePropagation()

		this._draggableRemoveStyle()
	}

	/** @param {MouseEvent} event */
	onClick (event) {
		event.stopImmediatePropagation()
		const origin = new MouseEvent(event.type, event)

		this.selected = !this.selected

		this.dispatchEvent(
			new CustomEvent('drag:clicked', {
				bubbles: true,
				detail: {
					id: this.id,
					value: this.value,
					origin: origin,
					selected: this.selected
				}
			})
		)
	}

	// --------------------------------------------------------------------------
	/** @return {boolean} */
	get selected () {
		return this.hasAttribute('selected')
	}

	/** @param {boolean} value */
	set selected (value) {
		if (value) {
			this.setAttribute('selected', 'selected')
		} else {
			this.removeAttribute('selected')
		}
	}

	// --------------------------------------------------------------------------
	toggleSelected () {
		this.selected = !this.selected
	}

	/** @returns {DropZone} */
	getParentDrop () {
		let node = null
		node = this
		while (node) {
			node = node.parentElement

			if (!node || node.nodeName.toLowerCase() === 'ark-zone-drop') {
				return /** @type {DropZone} */ (node)
			}
		}
	}

	setPosition () {
		const parent = this.getParentDrop()

		if (!parent) return
		this.x = parent.x
		this.y = parent.y
	}

	// --------------------------------------------------------------------------

	_draggableRemoveStyle () {
		this.classList.remove('ark-zone-drag--enter')
		this.classList.remove('ark-zone-drag--enter_disabled')
	}
}
customElements.define('ark-zone-drag', DragZone)
