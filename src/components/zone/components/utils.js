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
	return dataTransfer ? dataTransfer.types[0] : null
}

/** @param {event} event @return {DragZone | DropZone} */
export function getElementByDataTransfer (event) {
	const dataTransfer = getDataTransfer(event)
	const data = parseData(dataTransfer)

	if (!data) return null

	return document.querySelector(`[id="${data.id}"]`)
}
