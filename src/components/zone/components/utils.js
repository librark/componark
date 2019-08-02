/**
 * @typedef {import('./drop').DropZone} DropZone
 * @typedef {import('./drag').DragZone} DragZone
 * */

/** @param {DragZone | DropZone} destination @param {DragZone} drag */
export function isValidLevel (destination, drag) {
	if (!drag.hasAttribute('level')) return true

	let level = 0

	for (
		let item = /** @type {HTMLElement} */ (destination);
		item.tagName.toLowerCase() !== 'html';
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

/** @param {event} event */
export function getDataTransfer (event) {
	const dataTransfer = event['dataTransfer']
	return dataTransfer.types[0] ? JSON.parse(dataTransfer.types[0]) : []
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
