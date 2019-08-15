/** @param {HTMLElement} container @return {Object<string,any>} */
export function getSlots (container) {
	const slots = {
		general: []
	}

	for (const element of container.children) {
		let slot = element.getAttribute('slot')

		if (!slot) {
			slot = 'general'
		} else if (!Object.keys(slots).includes(slot)) {
			slots[slot] = []
		}

		slots[slot].push(element)
	}

	return slots
}
