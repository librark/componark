/**
 * @typedef {import('./drop').DropZone} DropZone
 * @typedef {import('./drag').DragZone} DragZone
 * */
import { Component } from '../../component'
import { uuidv4 } from '../../../utils'

export default class Zone extends Component {
	init (context) {
		this.x = null
		this.y = null
		this.id = uuidv4()
		return super.init()
	}

	reflectedProperties () {
		return ['x', 'y']
	}

	// ---------------------------------------------------------------------------

	/** @param {Zone} zone @param {DragZone} drag */
	_isValidLevel (zone, drag) {
		if (!drag.hasAttribute('level')) return true

		let level = 0

		for (
			let item = /** @type {HTMLElement} */ (zone);
			item.tagName.toLowerCase() !== 'html';
			item = /** @type {HTMLElement} */ (item.parentNode)
		) {
			if (item.tagName.toLowerCase() === 'ark-zone-drop') {
				level++
			}
		}

		return level <= parseInt(drag.getAttribute('level'))
	}

	_parseData (content) {
		try {
			return JSON.parse(content)
		} catch (e) {
			return null
		}
	}

	_getDataTransfer (event) {
		const dataTransfer = event.dataTransfer
		return dataTransfer ? dataTransfer.types[0] : null
	}

	/** @return {DragZone | DropZone} */
	_getElementByDataTransfer (event, parent = document) {
		const dataTransfer = this._getDataTransfer(event)

		const data = this._parseData(dataTransfer)
		if (!data) return null

		return parent.querySelector(`[id="${data.id}"]`)
	}
}
