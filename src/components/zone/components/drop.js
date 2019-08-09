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
	init () {
		this.x = this.x
		this.y = this.y

		this.id = uuidv4()

		/** @type {HTMLElement} */
		const parent = /** @type {unknown} */ (window.document)
		this.parent = /** @type {HTMLElement} */ (parent)

		return super.init()
	}

	reflectedProperties () {
		return ['x', 'y']
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
		this.addEventListener('dragover', event => {
			event.stopImmediatePropagation()
			event.preventDefault()
		})

		// ------------------------------------------------------------------------
		// dragenter
		// ------------------------------------------------------------------------
		this.addEventListener('dragenter', event => {
			event.stopImmediatePropagation()
			event.preventDefault()
			const drags = getElementsByDataTransfer(this.parent, event)
			this.droppableEnter(/** @type {DragZone[]} */ (drags))
		})

		// ------------------------------------------------------------------------
		// dragleave
		// ------------------------------------------------------------------------
		this.addEventListener('dragleave', event => {
			event.stopImmediatePropagation()
			event.preventDefault()
			this.droppableLeave()
		})

		// ------------------------------------------------------------------------
		// drop
		// ------------------------------------------------------------------------
		this.addEventListener('drop', event => {
			event.stopImmediatePropagation()
			event.preventDefault()
			const drags = /** @type {DragZone[]} */ (getElementsByDataTransfer(
				this.parent,
				event
			))

			const dataDragstart = getDataTransfer(event).find(
				data => data.dragstart === true
			)

			const dragstart = /** @type {DragZone} */ drags.find(
				drag => drag.id === dataDragstart.id
			)

			const copy = event.ctrlKey || false

			this.droppableDrop(dragstart, drags, copy)
		})

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
