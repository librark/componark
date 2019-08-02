import {
	getDataTransfer,
	getElementsByDataTransfer,
	isValidLevel,
	parseData
} from './utils'

import { Component } from '../../component'
import { uuidv4 } from '../../../utils'

export class DragZone extends Component {
	init () {
		this.x = null
		this.y = null
		this.id = uuidv4()

		return super.init()
	}

	reflectedProperties () {
		return ['x', 'y']
	}

	render () {
		this.setAttribute('draggable', 'true')

		return super.render()
	}

	load () {
		// ------------------------------------------------------------------------
		// dragstart
		// ------------------------------------------------------------------------
		this.addEventListener('dragstart', event => {
			// event.stopImmediatePropagation()
			// event.dataTransfer.clearData()

			// const transferArray = getDataTransfer(event)

			// transferArray.push()

			// transferArray.push(this.generateDataTransfer())

			// event.dataTransfer.setData(JSON.stringify(transferArray), '')

			// console.log(event.dataTransfer)

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
			const drag = getElementsByDataTransfer(event)
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
			const drag = getElementByDataTransfer(event)
			this.draggableDrop(/** @type {DragZone} */ (drag))
		})

		// ------------------------------------------------------------------------
		// click
		// ------------------------------------------------------------------------
		this.addEventListener('click', event => {
			if (event.ctrlKey) {
				event.stopImmediatePropagation()
				this._toggleSelected()
			}
		})
		return super.load()
	}

	generateDataTransfer () {
		return {
			id: this.id,
			width: this.offsetWidth,
			height: this.offsetHeight
		}
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
		const data = parseData(dataTransfer)
		if (!data || !this.parentElement) return

		if (isValidLevel(this, drag)) {
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

		if (isValidLevel(this, drag)) {
			this.parentElement.insertBefore(drag, this)
		}
	}

	selected () {
		this.setAttribute('selected', '')
	}

	unselected () {
		this.removeAttribute('selected')
	}

	isSelected () {
		return this.hasAttribute('selected')
	}

	// ---------------------------------------------------------------------------
	_toggleSelected () {
		if (this.isSelected()) {
			this.unselected()
		} else {
			this.selected()
		}
	}

	_draggableRemoveStyle () {
		this.style.padding = `0`
		this.classList.remove(`ark-zone-drag--enter`)
		this.classList.remove(`ark-zone-drag--enter_disabled`)
	}
}
customElements.define('ark-zone-drag', DragZone)
