/**
 * @typedef {import('./drag').DragZone} DragZone
 * @typedef {import('./drop').DropZone} DropZone
 * */
import {
	Component
} from '../../component'

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
		this.addEventListener('drag:dragenter', this.onDragDragenter.bind(this))
		this.addEventListener('drag:clicked', this.onDragClicked.bind(this))

		// -------------------------------------------------------------------------
		// zone
		// -------------------------------------------------------------------------
		this.parent.addEventListener('keydown', this.onkeyDown.bind(this))
		this.parent.addEventListener('keyup', this.onKeyUp.bind(this))
		this.addEventListener('mousedown', this.onMouseDown.bind(this))
		this.parent.addEventListener('mouseup', this.onMouseUp.bind(this))

		return super.load()
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
		const target = /** @type {DropZone} */ (event.target)
		const selected = target ? target.selected : false

		this._cleanSelectedDrops()

		target.selected = !selected
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
	// Drop
	// ---------------------------------------------------------------------------

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
	onDragClicked (event) {
		const target = /** @type {DragZone} */ (event.target)
		const selected = target ? target.selected : false

		this._cleanSelectedDrags()
		this._cleanSelectedDrops()

		target.selected = !selected
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

		const target = /** @type {Component} */ (event.target)
		this.dropStart = this.dropEnd = /** @type {DropZone} */ (target)

		this._showMultipleSelection()
	}

	onMouseUp () {
		this._showMultipleSelection()
		this._cleanDropStartDropEnd()
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

	// ---------------------------------------------------------------------------
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
}
customElements.define('ark-zone', Zone)
