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
		this.selectAll('ark-zone-drag').forEach(drag => {
			drag.addEventListener('zone:drag', this.onZoneDrag.bind(this))
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
		this.addEventListener('drop:mouseover', this.onDropMouseOver.bind(this))
		this.addEventListener('mousedown', this.onMouseDown.bind(this))
		this.parent.addEventListener('mouseup', this.onMouseUp.bind(this))

		// ------------------------------------------------------------------------
		this.parent.addEventListener('keydown', this.onkeyDown.bind(this))
		this.parent.addEventListener('keyup', this.onKeyUp.bind(this))

		// ------------------------------------------------------------------------
		this._assignPosition()
		return super.load()
	}

	cloneDrag (drag) {
		const clone = /** @type {DragZone} */ (drag.cloneNode(true))
		clone.id = uuidv4()
		return clone
	}

	clearSelectedDrags () {
		this.selectAll('ark-zone-drag[selected]').forEach((
			/** @type {DragZone} */ selectedDrag
		) => {
			selectedDrag.selected = false
		})
	}

	clearSelectedDrops () {
		this.selectAll('ark-zone-drop[selected]').forEach((
			/** @type {DragZone} */ selectedDrop
		) => {
			selectedDrop.selected = false
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

		this.clearSelectedDrops()

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
		const detail = event['detail'] || {}
		const originalEvent = detail.origin
		let selected = target.selected

		if (this.selectAll('ark-zone-drag[selected]').length) {
			selected = true
		}

		if (!originalEvent.shiftKey) {
			this.clearSelectedDrags()
			target.selected = !selected
		}

		this.clearSelectedDrops()
		this._dispatchSelectedZone()
	}

	/** @param {event} event */
	onDropClicked (event) {
		const target = /** @type {DropZone} */ (event.target)
		const selected = target ? target.selected : false

		this.clearSelectedDrops()
		target.selected = selected

		this._dispatchSelectedZone()
	}

	/** @param {MouseEvent} event */
	onMouseDown (event) {
		event.stopImmediatePropagation()
		if (!event.shiftKey) return

		const target = /** @type {Component} */(event.target)

		const drop = this._selectDropByPosition(
			target.getAttribute('x'), target.getAttribute('y')
		)

		this.dropStart = this.dropEnd = /** @type {DropZone} */ (drop)

		this._dispatchSelectedZone()
	}

	onMouseUp () {
		this._startSelection()
		this.selectionMode = false
	}

	/** @param {KeyboardEvent} event */
	onkeyDown (event) {
		if (!event.shiftKey) return

		this.selectAll('ark-zone-drag').forEach(drag => {
			drag.removeAttribute('draggable')
		})
	}

	/** @param {KeyboardEvent} event */
	onKeyUp (event) {
		if (event.key !== 'Shift') return

		this.selectAll('ark-zone-drag').forEach(drag => {
			drag.setAttribute('draggable', 'true')
		})

		this.selectionMode = false
	}

	/** @param {MouseEvent} event */
	onDropMouseOver (event) {
		event.stopImmediatePropagation()
		const origin = event.detail['origin']
		const target = /** @type {DropZone} */ (event.target)

		if (
			!origin.shiftKey || !this.dropStart || !this.selectionMode ||
      this.dropEnd === target
		) return

		this.dropEnd = target

		this._startSelection()
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
		this.selectionMode = this.id === zoneId

		if (!this.selectionMode) {
			this.clearSelectedDrags()
			this.clearSelectedDrops()
		}
	}

	// ---------------------------------------------------------------------------

	get selectionMode () {
		return this.hasAttribute('selected')
	}

	/** @param {boolean} value */
	set selectionMode (value) {
		if (value) {
			this.setAttribute('selected', 'selected')
		} else {
			this.removeAttribute('selected')
			this.dropStart = this.dropEnd = null
		}
	}

	// ---------------------------------------------------------------------------
	_startSelection () {
		this.clearSelectedDrags()
		this.clearSelectedDrops()

		if (!this.dropStart || !this.dropEnd) return

		const start = { x: this.dropStart.x, y: this.dropStart.y }
		const end = { x: this.dropEnd.x, y: this.dropEnd.y }

		const drops = this._getDropStartEnd(start, end)
		this._selectDrags(drops.start, drops.end)
	}

	/**
   * @param {{x, y}} drag1
   * @param {{x, y}} drag2
   * @returns {{start: {x, y}, end: {x, y}}}
   * */
	_getDropStartEnd (drag1, drag2) {
		let start = (
			drag1.x < drag2.x ? drag1 : drag2
		)

		let end = (
			start === drag1 ? drag2 : drag1
		)

		if (start.x === end.x && start.y > end.y) {
			const currentStart = start
			start = end
			end = currentStart
		}

		if (start.x < end.x && start.y > end.y) {
			const currentStartY = start.y
			const currentEndY = end.y

			end.y = currentStartY
			start.y = currentEndY
		}

		return { start: start, end: end }
	}

	/** @param {{x, y}} start @param {{x, y}} end */
	_selectDrags (start, end) {
		for (let x = start.x; x <= end.x; x++) {
			for (let y = start.y; y <= end.y; y++) {
				const drop = this._selectDropByPosition(x, y)

				drop.selected = true

				drop.selectAll('ark-zone-drag').forEach(
					(/** @type {DragZone} */ drag) => {
						drag.selected = true
					})
			}
		}
	}

	/** @param {string} x @param {string} y @return {DropZone} */
	_selectDropByPosition (x, y) {
		return /** @type {DropZone} */ (
			this.select(`ark-zone-drop[x="${x}"][y="${y}"]`)
		)
	}

	_dispatchSelectedZone () {
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
