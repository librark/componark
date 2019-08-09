/** @typedef {import('./drop').DropZone} DropZone */
import {
	getDataTransfer,
	getElementsByDataTransfer,
	isValidLevel
} from './utils'

import { Component } from '../../component'
import { uuidv4 } from '../../../utils'

export class DragZone extends Component {
	init () {
		this.x = this.x
		this.y = this.y
		this.drop = this.drop

		this.id = uuidv4()

		/** @type {HTMLElement} */
		const parent = /** @type {unknown} */ (window.document)
		this.parent = /** @type {HTMLElement} */ (parent)

		return super.init()
	}

	reflectedProperties () {
		return ['x', 'y', 'drop']
	}

	render () {
		const dataInfo = this.querySelector('[data-info]')
		const info = `[${this.x},${this.y}] ${this.drop}`
		if (!dataInfo) {
			const element = document.createElement('p')
			element.setAttribute('data-info', '')
			element.innerHTML = info
			this.appendChild(element)
		} else {
			dataInfo.innerHTML = info
		}
		// -------------------------------------------------------------------------

		this.setAttribute('draggable', 'true')

		return super.render()
	}

	load () {
		// ------------------------------------------------------------------------
		// dragstart
		// ------------------------------------------------------------------------
		this.addEventListener('dragstart', event => {
			this.draggableStart()
		})

		// ------------------------------------------------------------------------
		// dragend
		// ------------------------------------------------------------------------
		this.addEventListener('dragend', event => {
			event.stopImmediatePropagation()
			this.draggableEnd()
		})

		// ------------------------------------------------------------------------
		// dragenter
		// ------------------------------------------------------------------------
		this.addEventListener('dragenter', event => {
			event.stopImmediatePropagation()
			const dataTransfer = getDataTransfer(event)
			const drags = getElementsByDataTransfer(this.parent, event)
			this.draggableEnter(/** @type {DragZone[]} */ (drags), dataTransfer)
		})

		// ------------------------------------------------------------------------
		// dragleave
		// ------------------------------------------------------------------------
		this.addEventListener('dragleave', event => {
			event.stopImmediatePropagation()
			event.preventDefault()
			this.draggableLeave()
		})

		// ------------------------------------------------------------------------
		// drop
		// ------------------------------------------------------------------------
		this.addEventListener('drop', event => {
			event.stopImmediatePropagation()
			event.preventDefault()
			const drags = getElementsByDataTransfer(this.parent, event)
			this.draggableDrop(/** @type {DragZone[]} */ (drags))
		})

		// ------------------------------------------------------------------------
		// click
		// ------------------------------------------------------------------------
		this.addEventListener('click', event => {
			if (event.shiftKey) {
				this.selected = true
			}
		})
		return super.load()
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
		drags.forEach(drag => {
			if (isValidLevel(this, drag)) {
				this.parentElement.insertBefore(drag, this)
				drag.draggableEnd()
			}
		})
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
