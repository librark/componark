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

		// -------------------------------------------------------------------------
		// drag
		// -------------------------------------------------------------------------
		this.addEventListener('drag:dragenter', this.onDragDragenter.bind(this))
		this.addEventListener('drag:clicked', this.onDragClicked.bind(this))

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
}
customElements.define('ark-zone', Zone)
