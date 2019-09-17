/**
 * @typedef {import('./drag').DragZone} DragZone
 * */
import {
	getDataTransfer,
	getElementsByDataTransfer,
	isValidLevel
} from './utils'

import { Component } from '../../component'
import { uuidv4 } from '../../../utils'

export class DropZone extends Component {
	init (context = {}) {
		this.value = this.value || context['value']

		this.x = this.x
		this.y = this.y

		this.id = uuidv4()
		this.cols = this.cols || 1
		this.sequence = 0

		/** @type {HTMLElement} */
		const parent = /** @type {unknown} */ (window.document)
		this.parent = /** @type {HTMLElement} */ (parent)

		return super.init()
	}

	reflectedProperties () {
		return ['x', 'y', 'value', 'cols']
	}

	render () {
		this._setAttributeDirection()
		this.updateDragPosition()
		return super.render()
	}

	load () {
		// ------------------------------------------------------------------------
		// dragover
		// ------------------------------------------------------------------------
		this.addEventListener('dragover', this.onDragover.bind(this))

		// ------------------------------------------------------------------------
		// dragenter
		// ------------------------------------------------------------------------
		this.addEventListener('dragenter', this.onDragenter.bind(this))

		// ------------------------------------------------------------------------
		// dragleave
		// ------------------------------------------------------------------------
		this.addEventListener('dragleave', this.onDragleave.bind(this))

		// ------------------------------------------------------------------------
		// drop
		// ------------------------------------------------------------------------
		this.addEventListener('drop', this.onDrop.bind(this))

		// ------------------------------------------------------------------------
		// click
		// ------------------------------------------------------------------------
		this.addEventListener('click', this.onClick.bind(this))
		this.addEventListener('mouseover', this.onMouseOver.bind(this))

		// ------------------------------------------------------------------------
		this._setPosition(this.getParentDrop())

		return super.load()
	}

	/** @param {DragZone[]} drags */
	droppableEnter (drags) {
		let isValid = true
		drags.forEach(drag => {
			if (!isValidLevel(this, drag)) isValid = false
		})

		if (isValid) {
			this.classList.add('ark-zone-drop--hover')
		} else {
			this.classList.add('ark-zone-drop--hover_disabled')
		}
	}

	droppableLeave () {
		this._droppableRemoveStyle()
	}

	/** @param {DragZone} dragstart @param {DragZone[]} drags */
	droppableDrop (dragstart, drags, copy) {
		this._droppableRemoveStyle()

		this.dispatchEvent(
			new CustomEvent('zone:drop', {
				detail: {
					drop: this,
					drags: drags,
					dragstart: dragstart,
					copy: copy
				}
			})
		)
	}

	updateDragPosition () {
		this.selectAll('ark-zone-drag').forEach(drag => {
			drag.setAttribute('x', this.x)
			drag.setAttribute('y', this.y)
			drag.setAttribute('drop', this.id)
		})
	}

	// --------------------------------------------------------------------------
	/** @param {event} event */
	onDragover (event) {
		event.stopImmediatePropagation()
		event.preventDefault()
	}

	/** @param {event} event */
	onDragenter (event) {
		event.stopImmediatePropagation()
		event.preventDefault()
		const drags = getElementsByDataTransfer(this.parent, event)
		this.droppableEnter(/** @type {DragZone[]} */ (drags))
	}

	/** @param {event} event */
	onDragleave (event) {
		event.stopImmediatePropagation()
		event.preventDefault()
		this.droppableLeave()
	}

	/** @param {event} event */
	onDrop (event) {
		event.stopImmediatePropagation()
		event.preventDefault()

		const drags = /** @type {DragZone[]} */ (getElementsByDataTransfer(
			this.parent,
			event
		))

		const dataDragstart = getDataTransfer(event).find(
			data => data.dragstart === true
		)

		const dragstart = this._searchDragStart(dataDragstart, drags)

		const copy = event['ctrlKey'] || false

		this.droppableDrop(dragstart, drags, copy)
	}

	/** @param {event} event */
	onClick (event) {
		event.stopImmediatePropagation()

		if (!this.fixed) return

		this._toggleSelected()

		this.dispatchEvent(
			new CustomEvent('drop:clicked', {
				bubbles: true,
				detail: {
					id: this.id,
					value: this.value,
					origin: event
				}
			})
		)
	}

	/** @param {MouseEvent} event */
	onMouseOver (event) {
		event.stopImmediatePropagation()

		this.dispatchEvent(
			new CustomEvent('drop:mouseover', {
				bubbles: true,
				detail: {
					id: this.id,
					value: true,
					origin: event
				}
			})
		)
	}

	// --------------------------------------------------------------------------

	/** @returns {DropZone} */
	getParentDrop () {
		let node = null
		node = this
		while (node) {
			node = node.parentElement

			if (!node || node.nodeName.toLowerCase() === 'ark-zone-drop') {
				return /** @type {DropZone} */ (node)
			}

			if (node.nodeName.toLowerCase() === 'ark-zone-drag') return null
		}

		return null
	}

	// --------------------------------------------------------------------------
	get fixed () {
		return this.hasAttribute('fixed')
	}

	set fixed (value) {
		if (value) {
			this.setAttribute('fixed', 'true')
		} else {
			this.removeAttribute('fixed')
		}
	}

	get selected () {
		return this.hasAttribute('selected')
	}

	/** @param {boolean} value */
	set selected (value) {
		if (!this.fixed) value = false

		if (value) {
			this.setAttribute('selected', 'selected')
		} else {
			this.removeAttribute('selected')
		}
	}

	// --------------------------------------------------------------------------
	/** @param {object} dataDrag @param {DragZone[]} drags @returns {DragZone} */
	_searchDragStart (dataDrag, drags) {
		return /** @type {DragZone} */ drags.find(drag => {
			if (drag) {
				return drag.id === dataDrag.id
			}
		})
	}

	_droppableRemoveStyle () {
		this.classList.remove(`ark-zone-drop--hover`)
		this.classList.remove(`ark-zone-drop--hover_disabled`)
	}

	_setAttributeDirection () {
		if (!this.hasAttribute('direction')) {
			this.setAttribute('direction', 'column')
		}
	}

	_toggleSelected () {
		this.selected = !this.selected
	}

	/** @param {DropZone} parent */
	_setPosition (parent) {
		if (!parent) return

		const sequence = parent.sequence
		const cols = parseInt(parent.cols)

		this.x = sequence % cols
		this.y = Math.floor(sequence / cols)
		this.fixed = true

		parent.sequence += 1
	}
}
customElements.define('ark-zone-drop', DropZone)
