/**
 * @typedef {import('./drag').DragZone} DragZone
 * @typedef {import('./drop').DropZone} DropZone
 * */
import { Component } from '../../component'
import { isValidLevel } from './utils'
import { uuidv4 } from '../../../utils'

export class Zone extends Component {
	init (context = {}) {
		this.cols = context['cols'] || this.cols || 0

		this.id = uuidv4()

		/** @type {HTMLElement} */
		const parent = /** @type {unknown} */ (window.document)
		this.parent = /** @type {HTMLElement} */ (parent)

		return super.init()
	}

	reflectedProperties () {
		return ['cols']
	}

	render () {
		return super.render()
	}

	load () {
		// ------------------------------------------------------------------------
		// dragstart
		// ------------------------------------------------------------------------
		this.addEventListener('dragstart', this.onDragstart.bind(this))

		// ------------------------------------------------------------------------
		// zone:drop
		// ------------------------------------------------------------------------
		this.selectAll('ark-zone-drop').forEach(drop => {
			drop.addEventListener('zone:drop', this.onZoneDrop.bind(this))
		})

		// ------------------------------------------------------------------------
		// zone:drag
		// ------------------------------------------------------------------------
		this.selectAll('ark-zone-drag').forEach(drop => {
			drop.addEventListener('zone:drag', this.onZoneDrag.bind(this))
		})

		// ------------------------------------------------------------------------
		// zone:selected
		// ------------------------------------------------------------------------
		this.parent.addEventListener(
			'zone:selected',
			this.onZoneSelected.bind(this)
		)

		// ------------------------------------------------------------------------
		// click
		// ------------------------------------------------------------------------
		this.addEventListener('drag:clicked', this.onDragClicked.bind(this))
		this.addEventListener('drop:clicked', this.onDropClicked.bind(this))

		// ------------------------------------------------------------------------
		this._assignPosition()
		return super.load()
	}

	cloneDrag (drag) {
		const clone = /** @type {DragZone} */ (drag.cloneNode(true))
		clone.id = uuidv4()
		return clone
	}

	clearSelected () {
		this.selectAll('ark-zone-drag[selected]').forEach((
			/** @type {DragZone} */ selectedDrag
		) => {
			selectedDrag.selected = false
		})
	}

	// ---------------------------------------------------------------------------
	/**
   * @param {DropZone} drop
   * @param {DragZone[]} drags
   * @param {DragZone} dragstart
   * @param {boolean?} copy
   * */
	zoneDrop (drop, drags, dragstart, copy = false) {
		if (!(dragstart && drop)) return

		const changePosition = this._getChangePosition(dragstart, drop)
		let isValid = true

		drags.forEach(drag => {
			const absolutePosition = this._getAbsolutePosition(drag, changePosition)

			const dropDestination = this._selectDrop(
				absolutePosition.x,
				absolutePosition.y
			)

			if (dropDestination === null || !isValidLevel(dropDestination, drag)) {
				isValid = false
			}
		})

		if (!isValid) {
			drags.forEach(drag => drag.draggableEnd())
			return
		}

		const dragDropped = new EventDragDropped()

		drags.forEach(drag => {
			let targetDrag = drag
			const absolutePosition = this._getAbsolutePosition(drag, changePosition)

			const dropDestination = this._selectDrop(
				absolutePosition.x,
				absolutePosition.y
			)

			if (copy) {
				targetDrag = this.cloneDrag(drag)
				drag.draggableEnd()
			}

			dragDropped.setItem(dropDestination, targetDrag)

			dropDestination.appendChild(targetDrag)
			dropDestination.updateDragPosition()
			targetDrag.draggableEnd()
		})

		dragDropped.dispatch(this)
	}

	/**
   * @param {DropZone} drop
   * @param {DragZone[]} drags
   * @param {DragZone} referenceDrag
   * @param {boolean?} copy
   * */
	zoneDrag (drop, drags, referenceDrag, copy = false) {
		const dragDropped = new EventDragDropped()
		if (!drags.length || !referenceDrag) return

		drags.forEach(drag => {
			let targetDrag = drag

			if (isValidLevel(referenceDrag, targetDrag)) {
				if (copy) {
					targetDrag = this.cloneDrag(drag)
					drag.draggableEnd()
				}

				dragDropped.setItem(drop, targetDrag)

				drop.insertBefore(targetDrag, referenceDrag)
				targetDrag.draggableEnd()
			}
		})

		dragDropped.dispatch(this)
	}

	// ---------------------------------------------------------------------------
	/** @param {event} event */
	onDragstart (event) {
		event.stopImmediatePropagation()
		const dataTransfer = []

		this.selectAll('ark-zone-drag[selected]').forEach((
			/** @type {DragZone} */ selectedDrag
		) => {
			const isDragstart = event.target === selectedDrag
			dataTransfer.push(selectedDrag.generateDataTransfer(isDragstart))
			selectedDrag.draggableStart()
		})

		event['dataTransfer'].clearData()
		event['dataTransfer'].setData(JSON.stringify(dataTransfer), '')
	}

	/** @param {event} event */
	onDragClicked (event) {
		const target = /** @type {DragZone} */ (event.target)
		if (target && !target.hasAttribute('selected')) this.clearSelected()

		this.dispatchEvent(
			new CustomEvent('zone:selected', {
				bubbles: true,
				detail: {
					zoneId: this.id,
					origin: event
				}
			})
		)
	}

	/** @param {event} event */
	onDropClicked (event) {
		this.clearSelected()

		this.dispatchEvent(
			new CustomEvent('zone:selected', {
				bubbles: true,
				detail: {
					zoneId: this.id,
					origin: event
				}
			})
		)
	}

	/** @param {event} event */
	onZoneDrop (event) {
		event.stopImmediatePropagation()

		const drop = /** @type {DropZone} */ (event['detail']
			? event['detail'].drop
			: null)

		const drags = /** @type {DragZone[]} */ (event['detail']
			? event['detail'].drags
			: [])

		const dragstart = /** @type {DragZone} */ (event['detail']
			? event['detail'].dragstart
			: null)

		const copy = event['detail'] ? event['detail'].copy : false

		this.zoneDrop(drop, drags, dragstart, copy)
	}

	/** @param {event} event */
	onZoneDrag (event) {
		event.stopImmediatePropagation()

		const drop = /** @type {DropZone} */ (event['detail']
			? event['detail'].drop
			: null)

		const drags = /** @type {DragZone[]} */ (event['detail']
			? event['detail'].drags
			: [])

		const referenceDrag = /** @type {DragZone} */ (event['detail']
			? event['detail'].referenceDrag
			: null)

		const copy = event['detail'] ? event['detail'].copy : false

		this.zoneDrag(drop, drags, referenceDrag, copy)
	}

	/** @param {event} event */
	onZoneSelected (event) {
		const zoneId = event['detail'] ? event['detail'].zoneId : null
		if (this.id !== zoneId) this.clearSelected()
	}

	// ---------------------------------------------------------------------------
	_assignPosition () {
		const drops = /** @type {DropZone[]} */ this.selectAll('ark-zone-drop')
		let x = 0
		let y = 0

		drops.forEach((/** @type {DropZone} */ drop) => {
			this._setPosition(drop, String(x), String(y))

			if (y < this.cols - 1) {
				y++
			} else {
				x++
				y = 0
			}
		})
	}

	/**
   * @param {DropZone} drop @param {String} x @param {String} y
   * */
	_setPosition (drop, x, y) {
		drop.setAttribute('x', x)
		drop.setAttribute('y', y)
	}

	/** @return {DropZone} */
	_selectDrop (x, y) {
		return /** @type {DropZone} */ (this.select(
			`ark-zone-drop[x='${x}'][y='${y}']`
		))
	}

	/** @param {DragZone} start @param {DropZone | Object} end */
	_getChangePosition (start, end) {
		return {
			x: parseInt(end.x) - parseInt(start.x),
			y: parseInt(end.y) - parseInt(start.y)
		}
	}

	/** @param {DragZone} drag @param {Object} changePosition */
	_getAbsolutePosition (drag, changePosition) {
		return {
			x: parseInt(drag.x) + parseInt(changePosition.x),
			y: parseInt(drag.y) + parseInt(changePosition.y)
		}
	}
}
customElements.define('ark-zone', Zone)

class EventDragDropped {
	constructor () {
		this.detail = new Map()
	}

	setItem (drop, drag) {
		const item = this.detail.get(drop.id)

		if (item) {
			item.drags.push({
				id: drag.id,
				detail: drag.value
			})

			this.detail.set(drop.id, item)
		} else {
			this.detail.set(drop.id, {
				drop: {
					id: drop.id,
					value: drop.value
				},
				drags: [
					{
						id: drag.id,
						value: drag.value
					}
				]
			})
		}
	}

	/** @param {Component} component */
	dispatch (component) {
		component.dispatchEvent(
			new CustomEvent('drag:dropped', {
				detail: {
					value: Array.from(this.detail.values())
				}
			})
		)
	}
}
