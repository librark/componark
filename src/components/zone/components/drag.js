/** @typedef {import('./drop').DropZone} DropZone */
import {
	getDataTransfer,
	getElementsByDataTransfer,
	isValidLevel
} from './utils'

import { Component } from '../../component'
import { uuidv4 } from '../../../utils'

export class DragZone extends Component {
	init (context = {}) {
		this.x = this.x
		this.y = this.y
		this.drop = this.drop
		this.value = this.value || context['value']

		this.id = uuidv4()

		/** @type {HTMLElement} */
		const parent = /** @type {unknown} */ (window.document)
		this.parent = /** @type {HTMLElement} */ (parent)

		return super.init()
	}

	reflectedProperties () {
		return ['x', 'y', 'drop', 'value']
	}

	render () {
		this.setAttribute('draggable', 'true')

		return super.render()
	}

	load () {
		// ------------------------------------------------------------------------
		// dragstart
		// ------------------------------------------------------------------------
		this.addEventListener('dragstart', this.onDraggableStart.bind(this))

		// ------------------------------------------------------------------------
		// dragend
		// ------------------------------------------------------------------------
		this.addEventListener('dragend', this.onDraggableEnd.bind(this))

		// ------------------------------------------------------------------------
		// dragenter
		// ------------------------------------------------------------------------
		this.addEventListener('dragenter', this.onDraggableEnter.bind(this))

		// ------------------------------------------------------------------------
		// dragleave
		// ------------------------------------------------------------------------
		this.addEventListener('dragleave', this.onDraggableLeave.bind(this))

		// ------------------------------------------------------------------------
		// drop
		// ------------------------------------------------------------------------
		this.addEventListener('drop', this.onDraggableDrop.bind(this))

		// ------------------------------------------------------------------------
		// click
		// ------------------------------------------------------------------------
		this.addEventListener('click', this.onClick.bind(this))

		// ------------------------------------------------------------------------
		return super.load()
	}

	// --------------------------------------------------------------------------

	draggableStart () {
		this.selected = true
		this.classList.add(`ark-zone-drag--dragging`)
		setTimeout(_ => this.classList.add(`ark-zone-drag--hidden`))
	}

	draggableEnd () {
		this.render()
		this.selected = false
		this.classList.remove(`ark-zone-drag--dragging`)
		setTimeout(_ => this.classList.remove(`ark-zone-drag--hidden`))
	}

	/** @param {DragZone[]} drags @param {Array} dataTransfer */
	draggableEnter (drags, dataTransfer) {
		if (!dataTransfer || !this.parentElement) return

		let isValid = true
		let height = 0
		let width = 0

		drags.forEach(drag => {
			if (!isValidLevel(this, drag)) isValid = false
			const data = dataTransfer.find(item => item.id === drag.id) || null
			if (data) {
				height += data.height
				width += data.width
			}
		})

		if (isValid) {
			if (this.parentElement.getAttribute('direction') === 'column') {
				this.style.paddingTop = `${height + 5}px`
			} else {
				this.style.paddingLeft = `${width + 5}px`
			}
			this.classList.add('ark-zone-drag--enter')
		} else {
			this.classList.add('ark-zone-drag--enter_disabled')
		}
	}

	draggableLeave () {
		this._draggableRemoveStyle()
	}

	/** @param {DragZone[]} drags */
	draggableDrop (drags) {
		this._draggableRemoveStyle()

		this.dispatchEvent(
			new CustomEvent('zone:drag', {
				detail: {
					drop: this.parentElement,
					referenceDrag: this,
					drags: drags
				}
			})
		)
	}

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

	/** @param {Boolean?} dragstart */
	generateDataTransfer (dragstart = false) {
		return {
			id: this.id,
			width: this.offsetWidth,
			height: this.offsetHeight,
			dragstart: dragstart
		}
	}

	// ---------------------------------------------------------------------------
	// ---------------------------------------------------------------------------

	/** @param {event} event */
	onDraggableStart (event) {
		this.draggableStart()
	}

	/** @param {event} event */
	onDraggableEnd (event) {
		event.stopImmediatePropagation()
		this.draggableEnd()
	}

	/** @param {event} event */
	onDraggableEnter (event) {
		event.stopImmediatePropagation()
		const drags = getElementsByDataTransfer(this.parent, event)
		const dataTransfer = getDataTransfer(event)
		this.draggableEnter(/** @type {DragZone[]} */ (drags), dataTransfer)
	}

	/** @param {event} event */
	onDraggableLeave (event) {
		event.stopImmediatePropagation()
		event.preventDefault()
		this.draggableLeave()
	}

	/** @param {event} event */
	onDraggableDrop (event) {
		event.stopImmediatePropagation()
		event.preventDefault()
		const drags = getElementsByDataTransfer(this.parent, event)
		this.draggableDrop(/** @type {DragZone[]} */ (drags))
	}

	/** @param {event} event */
	onClick (event) {
		event.stopImmediatePropagation()

		if (event['shiftKey']) {
			this.selected = true
		}

		this.dispatchEvent(
			new CustomEvent('drag:clicked', {
				bubbles: true,
				detail: {
					id: this.id,
					value: this.value,
					origin: event
				}
			})
		)
	}

	// ---------------------------------------------------------------------------
	_toggleSelected () {
		this.selected = !this.selected
	}

	_draggableRemoveStyle () {
		this.style.padding = `0`
		this.classList.remove(`ark-zone-drag--enter`)
		this.classList.remove(`ark-zone-drag--enter_disabled`)
	}
}
customElements.define('ark-zone-drag', DragZone)
