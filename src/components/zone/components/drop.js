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
	init (context) {
		this.x = this.x
		this.y = this.y
		this.detail = this.detail || context['detail']

		this.id = uuidv4()

		/** @type {HTMLElement} */
		const parent = /** @type {unknown} */ (window.document)
		this.parent = /** @type {HTMLElement} */ (parent)

		return super.init()
	}

	reflectedProperties () {
		return ['x', 'y', 'detail']
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

	// --------------------------------------------------------------------------
	/** @param {object} dataDrag @param {DragZone[]} drags @returns {DragZone} */
	_searchDragStart (dataDrag, drags) {
		return /** @type {DragZone} */ drags.find(
			drag => { if (drag) { return drag.id === dataDrag.id } }
		)
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
}
customElements.define('ark-zone-drop', DropZone)
