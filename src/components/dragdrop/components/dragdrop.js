import { Component } from '../../component'
import { uuidv4 } from '../../../utils'

export class DragDrop extends Component {
	init (context) {
		this.x = null
		this.y = null
		return super.init()
	}

	reflectedProperties () {
		return ['x', 'y']
	}

	render () {
		this._setAttributeUUID()
		return super.render()
	}

	static launch (context, parent = document.body) {
		const dragdrop = new DragDrop().init(context)
		parent.appendChild(dragdrop)
		return dragdrop
	}

	load () {
		if (this.hasAttribute('droppable')) {
			this._setAttributeDirection()
			this._addEventDroppable()
		} else {
			this.setAttribute('draggable', 'true')
			this._addEventDraggable()
		}
		return super.load()
	}

	// --------------------------------------------------------------------------
	_setAttributeUUID () {
		this.id = uuidv4()
	}

	_setAttributeDirection () {
		if (!this.hasAttribute('direction')) {
			this.setAttribute('direction', 'column')
		}
	}

	// --------------------------------------------------------------------------
	// Droppable
	// --------------------------------------------------------------------------
	_addEventDroppable () {
		// ------------------------------------------------------------------------
		// dragover
		// ------------------------------------------------------------------------
		this.addEventListener('dragover', event => {
			event.preventDefault()
		})

		// ------------------------------------------------------------------------
		// dragenter
		// ------------------------------------------------------------------------
		this.addEventListener('dragenter', event => {
			event.preventDefault()
			const draggable = this._getElementByDataTransfer(event)
			this.droppableEnter(draggable)
		})

		// ------------------------------------------------------------------------
		// dragleave
		// ------------------------------------------------------------------------
		this.addEventListener('dragleave', event => {
			event.preventDefault()
			this.droppableLeave()
		})

		// ------------------------------------------------------------------------
		// drop
		// ------------------------------------------------------------------------
		this.addEventListener('drop', event => {
			event.preventDefault()
			const draggable = this._getElementByDataTransfer(event)
			this.droppableDrop(draggable)
		})
	}

	droppableEnter (draggable) {
		if (this._dropAllowed(this, draggable)) {
			this.classList.add('ark-dragdrop--hover')
		}
	}

	droppableLeave () {
		this._droppableRemoveStyle()
	}

	droppableDrop (draggable) {
		this._droppableRemoveStyle()
		if (this._dropAllowed(this, draggable)) {
			this.appendChild(draggable)
		}
	}

	_droppableRemoveStyle () {
		this.classList.remove(`ark-dragdrop--hover`)
	}

	// --------------------------------------------------------------------------
	// Draggable
	// --------------------------------------------------------------------------
	_addEventDraggable () {
		// ------------------------------------------------------------------------
		// dragstart
		// ------------------------------------------------------------------------
		this.addEventListener('dragstart', event => {
			event.stopPropagation()
			event.dataTransfer.clearData()
			event.dataTransfer.setData(this.generateDataTransfer(), '')
			this.draggableStart()
		})

		// ------------------------------------------------------------------------
		// dragend
		// ------------------------------------------------------------------------
		this.addEventListener('dragend', event => {
			this.draggableEnd()
		})

		// ------------------------------------------------------------------------
		// dragenter
		// ------------------------------------------------------------------------
		this.addEventListener('dragenter', event => {
			const dataTransfer = this._getDataTransfer(event)
			const draggable = this._getElementByDataTransfer(event)
			this.draggableEnter(draggable, dataTransfer)
		})

		// ------------------------------------------------------------------------
		// dragleave
		// ------------------------------------------------------------------------
		this.addEventListener('dragleave', event => {
			event.preventDefault()
			this.draggableLeave()
		})

		// ------------------------------------------------------------------------
		// drop
		// ------------------------------------------------------------------------
		this.addEventListener('drop', event => {
			event.preventDefault()
			const droppable = this._getElementByDataTransfer(event)
			this.draggableDrop(droppable)
		})
	}

	generateDataTransfer () {
		if (!this.id) return ''
		return JSON.stringify({
			id: this.id,
			width: this.offsetWidth,
			height: this.offsetHeight
		})
	}

	draggableStart () {
		this.classList.add(`ark-dragdrop--dragging`)
		setTimeout(() => {
			this.classList.add(`ark-dragdrop--hidden`)
		})
	}

	draggableEnd () {
		this.classList.remove(`ark-dragdrop--dragging`)
		setTimeout(() => {
			this.classList.remove(`ark-dragdrop--hidden`)
		})
	}

	draggableEnter (draggable, dataTransfer) {
		const data = this._parseData(dataTransfer)
		if (!data || !this.parentElement) return

		if (this._dropAllowed(this, draggable)) {
			if (this.parentElement.getAttribute('direction') === 'column') {
				this.style.paddingTop = `${data.height + 5}px`
			} else {
				this.style.paddingLeft = `${data.width + 5}px`
			}

			this.classList.add('ark-dragdrop--enter')
		}
	}

	draggableLeave () {
		this._draggableRemoveStyle()
	}

	draggableDrop (/* @type {HTMLImageElement} */ draggable) {
		this._draggableRemoveStyle()
		if (this._dropAllowed(this, draggable)) {
			this.parentElement.insertBefore(draggable, this)
		}
	}

	_draggableRemoveStyle () {
		this.style.padding = `0`
		this.classList.remove(`ark-dragdrop--enter`)
	}

	// --------------------------------------------------------------------------
	// --------------------------------------------------------------------------
	_dropAllowed (
		/* @type {HTMLImageElement} */ destinationNode,
		/* @type {HTMLImageElement} */ draggable
	) {
		if (!draggable) return false
		if (!draggable.hasAttribute('level')) return true

		let levelDestination = 0

		for (let item = destinationNode; item; item = item.parentNode) {
			if (item.tagName.toLowerCase() === 'html') break

			if (
				item.tagName.toLowerCase() === 'ark-dragdrop' &&
        item.hasAttribute('droppable')
			) {
				levelDestination++
			}
		}

		return levelDestination <= parseInt(draggable.getAttribute('level'))
	}

	_getDataTransfer (event) {
		const dataTransfer = event.dataTransfer
		return dataTransfer ? dataTransfer.types[0] : null
	}

	_getElementByDataTransfer (event, parent = document) {
		const dataTransfer = this._getDataTransfer(event)

		const data = this._parseData(dataTransfer)
		if (!data) return null

		return parent.querySelector(`[id="${data.id}"]`)
	}

	_parseData (content) {
		try {
			return JSON.parse(content)
		} catch (e) {
			return null
		}
	}
}
customElements.define('ark-dragdrop', DragDrop)
