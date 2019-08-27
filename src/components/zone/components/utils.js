/**
 * @typedef {import('./drop').DropZone} DropZone
 * @typedef {import('./drag').DragZone} DragZone
 * @typedef {import('../../component').Component} Component
 * */

/** @param {DragZone | DropZone} destination @param {DragZone} drag */
export function isValidLevel (destination, drag) {
	if (!drag.hasAttribute('level')) return true

	let level = 0

	for (
		let item = /** @type {HTMLElement} */ (destination);
		item && item.tagName.toLowerCase() !== 'html';
		item = /** @type {HTMLElement} */ (item.parentNode)
	) {
		if (item.tagName.toLowerCase() === 'ark-zone-drop') {
			level++
		}
	}

	return level <= parseInt(drag.getAttribute('level'))
}

/** @param {string} content */
export function parseData (content) {
	try {
		return JSON.parse(content)
	} catch (e) {
		return null
	}
}

/** @param {event} event @return {Array} */
export function getDataTransfer (event) {
	const dataTransfer = event['dataTransfer']
	return dataTransfer.types[0] ? parseData(dataTransfer.types[0]) : []
}

/**
 * @param {HTMLElement} parent @param {event} event
 * @return {DragZone[] | DropZone[]} */
export function getElementsByDataTransfer (parent, event) {
	const data = getDataTransfer(event)

	const elements = []
	for (const item of data) {
		elements.push(parent.querySelector(`[id="${item.id}"]`))
	}

	return elements
}

export class EventDragDropped {
	constructor () {
		this.detail = new Map()
	}

	setItem (drop, drag) {
		const item = this.detail.get(drop.id)
		if (item) {
			item.drags.push({
				id: drag.id,
				detail: drag.detail
			})

			this.detail.set(drop.id, item)
		} else {
			this.detail.set(drop.id, {
				drop: {
					id: drop.id,
					detail: drop.detail
				},
				drags: [{
					id: drag.id,
					detail: drag.detail
				}] })
		}
	}

	/** @param {Component} component */
	dispatch (component) {
		component.dispatchEvent(
			new CustomEvent('drag:dropped', {
				detail: Array.from(this.detail.values())
			})
		)
	}
}
