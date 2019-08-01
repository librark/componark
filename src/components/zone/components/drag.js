import Zone from './zone'

export class DragZone extends Zone {
	render () {
		this.setAttribute('draggable', 'true')
		// ------------------------------------------------------------------------
		// dragstart
		// ------------------------------------------------------------------------
		this.addEventListener('dragstart', event => {
			event.stopImmediatePropagation()
			event.dataTransfer.clearData()
			event.dataTransfer.setData(this.generateDataTransfer(), '')
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
			const dataTransfer = this._getDataTransfer(event)
			const drag = this._getElementByDataTransfer(event)
			this.draggableEnter(/** @type {DragZone} */ (drag), dataTransfer)
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
			const drag = this._getElementByDataTransfer(event)
			this.draggableDrop(/** @type {DragZone} */ (drag))
		})

		return super.render()
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
		this.classList.add(`ark-zone-drag--dragging`)
		setTimeout(_ => this.classList.add(`ark-zone-drag--hidden`))
	}

	draggableEnd () {
		this.classList.remove(`ark-zone-drag--dragging`)
		setTimeout(_ => this.classList.remove(`ark-zone-drag--hidden`))
	}

	/** @param {DragZone} drag */
	draggableEnter (drag, dataTransfer) {
		const data = this._parseData(dataTransfer)
		if (!data || !this.parentElement) return

		if (this._isValidLevel(this, drag)) {
			if (this.parentElement.getAttribute('direction') === 'column') {
				this.style.paddingTop = `${data.height + 5}px`
			} else {
				this.style.paddingLeft = `${data.width + 5}px`
			}

			this.classList.add('ark-zone-drag--enter')
		} else {
			this.classList.add('ark-zone-drag--enter_disabled')
		}
	}

	draggableLeave () {
		this._draggableRemoveStyle()
	}

	/** @param {DragZone} drag */
	draggableDrop (drag) {
		this._draggableRemoveStyle()

		if (this._isValidLevel(this, drag)) {
			this.parentElement.insertBefore(drag, this)
		}
	}

	_draggableRemoveStyle () {
		this.style.padding = `0`
		this.classList.remove(`ark-zone-drag--enter`)
		this.classList.remove(`ark-zone-drag--enter_disabled`)
	}
}
customElements.define('ark-zone-drag', DragZone)
