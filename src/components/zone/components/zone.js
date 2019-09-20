/**
 * @typedef {import('./drag').DragZone} DragZone
 * @typedef {import('./drop').DropZone} DropZone
 * */
import {
	Component
} from '../../component'
import {
	uuidv4
} from '../../../utils'

export class Zone extends Component {
	init (context = {}) {
		/** @type {HTMLElement} */
		const parent = /** @type {unknown} */ (window.document)
		this.parent = /** @type {HTMLElement} */ (parent)

		return super.init()
	}

	render () {
		return super.render()
	}

	load () {
		// -------------------------------------------------------------------------
		// drop
		// -------------------------------------------------------------------------
		this.addEventListener('drop:dragenter', this.onDropDragenter.bind(this))
		this.addEventListener('drop:clicked', this.onDropClicked.bind(this))
		this.addEventListener('drop:mouseover', this.onDropMouseover.bind(this))

		// -------------------------------------------------------------------------
		// drag
		// -------------------------------------------------------------------------
		this.addEventListener('drag:dragstart', this.onDragDragstart.bind(this))
		this.addEventListener('drag:dragenter', this.onDragDragenter.bind(this))
		this.addEventListener('drag:dragend', this.onDragDragend.bind(this))
		this.addEventListener('drag:clicked', this.onDragClicked.bind(this))

		// -------------------------------------------------------------------------
		// zone
		// -------------------------------------------------------------------------
		this.addEventListener('mousedown', this.onMouseDown.bind(this))
		this.parent.addEventListener('keydown', this.onkeyDown.bind(this))
		this.parent.addEventListener('keyup', this.onKeyUp.bind(this))
		this.parent.addEventListener('mouseup', this.onMouseUp.bind(this))

		return super.load()
	}

	disconnectedCallback () {
		this.parent.removeEventListener('keydown', this.onkeyDown.bind(this))
		this.parent.removeEventListener('keyup', this.onKeyUp.bind(this))
		this.parent.removeEventListener('mouseup', this.onMouseUp.bind(this))
	}

	// ---------------------------------------------------------------------------
	// Drop
	// ---------------------------------------------------------------------------

	/** @param {event} event */
	onDropDragenter (event) {
		event.stopImmediatePropagation()

		const drop = /** @type {DropZone} */ (event.target)
		const drag = this.select('ark-zone-drag[selected]')

		drop.appendChild(drag)
	}

	/** @param {event} event */
	onDropClicked (event) {
		const ctrlKey = event['detail'].origin.ctrlKey

		const drop = /** @type {DropZone} */ (event.target)
		const selected = drop ? drop.selected : false

		if (!ctrlKey) {
			this._cleanSelectedDrops()
		}

		drop.selected = !selected

		if (!drop.selected && ctrlKey) {
			drop.cleanSelectedDrags()
		} else if (drop.selected && ctrlKey) {
			drop.setSelectedDrags(true)
		}
	}

	/** @param {event} event */
	onDropMouseover (event) {
		if (!this.dropStart) return

		const drop = /** @type {DropZone} */ (event.target)
		const parent = drop.getParentDrop()

		if (this.dropEnd === drop || this.dropStart.getParentDrop() !== parent) {
			return
		}

		this.dropEnd = drop
		this._showMultipleSelection()
	}

	// ---------------------------------------------------------------------------
	// Drag
	// ---------------------------------------------------------------------------
	/** @param {event} event */
	onDragDragstart (event) {
		event.stopImmediatePropagation()
		this._cleanSelectedDrags()
		this._cleanSelectedDrops()
	}

	/** @param {event} event */
	onDragDragenter (event) {
		event.stopImmediatePropagation()

		const existingDrag = /** @type {DragZone} */ (event.target)
		const drop = existingDrag.getParentDrop()

		const selectedDrags = this._getSelectedDrags()

		const newDrag = selectedDrags.length ? selectedDrags[0] : null

		if (existingDrag === newDrag) {
			return
		}

		drop.insertBefore(newDrag, existingDrag)
	}

	/** @param {event} event */
	onDragDragend (event) {
		event.stopImmediatePropagation()

		const dragDropped = new EventAlterZone('MOVE')

		const drag = /** @type {DragZone} */ (event.target)
		const drop = drag.getParentDrop()

		dragDropped.setItem(drop, drag)
		dragDropped.dispatch(this)
	}

	/** @param {event} event */
	onDragClicked (event) {
		const target = /** @type {DragZone} */ (event.target)
		const selected = !(target ? target.selected : false)

		if (event['detail'].origin.ctrlKey) {
			const drop = target.getParentDrop()
			drop.setSelectedDrags(selected)
			drop.selected = selected
		} else {
			this._cleanSelectedDrags()
			this._cleanSelectedDrops()

			target.selected = selected
		}
	}

	// ---------------------------------------------------------------------------
	// zone
	// ---------------------------------------------------------------------------

	/** @param {KeyboardEvent} event */
	onkeyDown (event) {
		if (event.shiftKey) {
			this.selectAll('ark-zone-drag').forEach(drag => {
				drag.removeAttribute('draggable')
			})
		}

		if (!event.ctrlKey) return

		const keyCode = String.fromCharCode(event.keyCode).toLowerCase()

		if (keyCode === 'c') {
			this.keyboardAction = 'copy'
		} else if (keyCode === 'x') {
			this.keyboardAction = 'cut'
		} else if (keyCode === 'v') {
			this._pasteOption(this.keyboardAction)
			this.keyboardAction = undefined
		}
	}

	/** @param {KeyboardEvent} event */
	onKeyUp (event) {
		if (event.key !== 'Shift') return

		this.selectAll('ark-zone-drag').forEach(drag => {
			drag.setAttribute('draggable', 'true')
		})

		this._cleanDropStartDropEnd()
	}

	/** @param {MouseEvent} event */
	onMouseDown (event) {
		event.stopImmediatePropagation()
		if (!event.shiftKey) return

		const drop = this._getParentDrop(/** @type {HTMLElement} */ (event.target))

		if (!drop || !drop.fixed) return

		this.dropStart = this.dropEnd = /** @type {DropZone} */ (drop)

		this._showMultipleSelection()
	}

	onMouseUp () {
		this._showMultipleSelection()
		this._cleanDropStartDropEnd()
	}

	// ---------------------------------------------------------------------------
	/** @param {string} keyboardAction */
	_pasteOption (keyboardAction) {
		if (!keyboardAction) return

		const drops = this._getSelectedDrops()
		const drags = this._getSelectedDrags()

		if (!drops.length || !drags.length) return
		const selectedDrop = drops[0]

		if (keyboardAction === 'copy') {
			this._copyDrags(selectedDrop, drags)
		} else if (keyboardAction === 'cut') {
			this._cutDrags(selectedDrop, drags)
		}
	}

	/** @param {DropZone} drop @param {DragZone[]} drags */
	_moveSelectedDrags (type, drop, drags, action) {
		const parentDrop = drop.getParentDrop()

		if (!parentDrop.isDestinationValid(drop, drags)) return

		const difference = parentDrop.getDifferenceDropsPositions(drop, drags[0])
		const dragDropped = new EventAlterZone(type)

		for (const drag of drags) {
			const relativeDrop = parentDrop.getRelativeDrop(drag, difference)
			const targetDrag = action(drag, relativeDrop)
			dragDropped.setItem(relativeDrop, targetDrag)
		}

		this._cleanSelectedDrops()
		dragDropped.dispatch(this)
	}

	/** @param {DropZone} drop @param {DragZone[]} drags */
	_copyDrags (drop, drags) {
		const action = (drag, relativeDrop) => {
			drag.selected = false

			const clone = /** @type {DragZone} */ (drag.cloneNode(true))
			relativeDrop.appendChild(clone)

			clone.id = uuidv4()
			clone.setPosition()

			return clone
		}

		this._moveSelectedDrags('COPY', drop, drags, action)
	}

	/** @param {DropZone} drop @param {DragZone[]} drags */
	_cutDrags (drop, drags) {
		const action = (drag, relativeDrop) => {
			relativeDrop.appendChild(drag)
			drag.setPosition()
			drag.selected = false

			return drag
		}

		this._moveSelectedDrags('MOVE', drop, drags, action)
	}

	_showMultipleSelection () {
		if (
			!this.dropStart || !this.dropEnd ||
      this.dropStart.getParentDrop() !== this.dropEnd.getParentDrop()
		) {
			return
		}

		this._cleanSelectedDrops()
		this._cleanSelectedDrags()

		const parent = this.dropStart.getParentDrop()

		const drops = this._calculatePositionsToSelect(
			this.dropStart.getPositions(), this.dropEnd.getPositions()
		)

		const start = drops.start
		const end = drops.end

		for (let x = start.x; x <= end.x; x++) {
			for (let y = start.y; y <= end.y; y++) {
				const drop = parent.selectDropByPosition(x, y)
				drop.selected = true
				drop.setSelectedDrags(true)
			}
		}
	}

	/**
   * @param {{x, y}} drag1
   * @param {{x, y}} drag2
   * @returns {{start: {x, y}, end: {x, y}}}
   * */
	_calculatePositionsToSelect (drag1, drag2) {
		let start = drag1.x < drag2.x ? drag1 : drag2

		let end = start === drag1 ? drag2 : drag1

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

		return {
			start: start,
			end: end
		}
	}

	/** @returns {DropZone[]} */
	_getSelectedDrops () {
		return /** @type {DropZone[]} */ ([
			...this.selectAll('ark-zone-drop[selected]')
		])
	}

	/** @returns {DragZone[]} */
	_getSelectedDrags () {
		return /** @type {DragZone[]} */ ([
			...this.selectAll('ark-zone-drag[selected]')
		])
	}

	_cleanSelectedDrops () {
		this._getSelectedDrops().forEach(drop => {
			drop.selected = false
		})
	}

	_cleanSelectedDrags () {
		this._getSelectedDrags().forEach(drag => {
			drag.selected = false
		})
	}

	_cleanDropStartDropEnd () {
		this.dropStart = this.dropEnd = null
	}

	/** @param {HTMLElement} target @returns {DropZone} */
	_getParentDrop (target) {
		let node = target

		while (node) {
			const tagName = node.tagName.toLowerCase()

			if (tagName === 'ark-zone-drag') {
				const drag = /** @type {DragZone} */ (node)
				return drag.getParentDrop()
			} else if (tagName === 'ark-zone-drop') {
				return /** @type {DropZone} */ (node)
			}

			node = node.parentElement
		}

		return null
	}
}
customElements.define('ark-zone', Zone)

class EventAlterZone {
	/** @param {string} type */
	constructor (type) {
		this.detail = new Map()
		this.type = type
	}

	setItem (drop, drag) {
		const item = this.detail.get(drop.id)

		if (item) {
			item.drags.push({
				id: drag.id,
				value: drag.value
			})

			this.detail.set(drop.id, item)
		} else {
			this.detail.set(drop.id, {
				drop: {
					id: drop.id,
					value: drop.value
				},
				drags: [{
					id: drag.id,
					value: drag.value
				}]
			})
		}
	}

	/** @param {Component} component */
	dispatch (component) {
		const value = Array.from(this.detail.values())

		component.dispatchEvent(
			new CustomEvent('zone:alter', {
				detail: {
					value: value,
					type: this.type
				}
			})
		)
	}
}
