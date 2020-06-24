/**
 * @param {HTMLElement} container
 * @return {Object<string, Array<HTMLElement>>}
 * */
export function getSlots (container) {
	const slots = { general: [] }

	for (const element of container.children) {
		const slot = element.getAttribute('slot') || 'general'
		if (!Object.keys(slots).includes(slot)) slots[slot] = []

		slots[slot].push(element)
	}

	return slots
}
