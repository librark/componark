/**
 * @typedef {import('./drop').DropZone} DropZone
 * @typedef {import('./drag').DragZone} DragZone
 * */
import { Component } from '../../component'
import { uuidv4 } from '../../../utils'

export class Zone extends Component {
	init () {
		this.id = uuidv4()
		return super.init()
	}

	render () {
		return super.render()
	}

	load () {
		this.addEventListener('dragstart', event => {
			event.stopImmediatePropagation()
			const drag = /** @type {DragZone} */ (event.target)

			if (!drag.isSelected()) return super.load()

			const dataTransfer = []
			this.selectAll('ark-zone-drag').forEach((
				/** @type {DragZone} */ selectedDrag
			) => {
				dataTransfer.push(selectedDrag.generateDataTransfer())
				// selectedDrag.draggableStart()
			})

			event.dataTransfer.clearData()
			event.dataTransfer.setData(JSON.stringify(dataTransfer), '')
			console.log('dragstart', JSON.parse(event.dataTransfer.types[0]))
		})
		return super.load()
	}
}
customElements.define('ark-zone', Zone)
