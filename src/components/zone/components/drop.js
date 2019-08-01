/**
 * @typedef {import('./drag').DragZone} DragZone
 * */
import Zone from './zone'

export class DropZone extends Zone {
	render () {
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
			const drag = this._getElementByDataTransfer(event)
			this.droppableEnter(/** @type {DragZone} */ (drag))
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
			const drag = this._getElementByDataTransfer(event)
			this.droppableDrop(/** @type {DragZone} */ (drag))
		})

		// -------------------------------------------------------------------------
		this._setAttributeDirection()
		return super.render()
	}

	/** @param {DragZone} drag */
	droppableEnter (drag) {
		if (this._isValidLevel(this, drag)) {
			this.classList.add('ark-zone-drop--hover')
		} else {
			this.classList.add('ark-zone-drop--hover_disabled')
		}
	}

	droppableLeave () {
		this._droppableRemoveStyle()
	}

	/** @param {DragZone} drag */
	droppableDrop (drag) {
		this._droppableRemoveStyle()

		if (this._isValidLevel(this, drag)) {
			this.appendChild(drag)
		}
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
