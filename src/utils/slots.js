/** @param {HTMLElement} container @return {Object<string,HTMLElement>} */
export function getSlots (container) {
  const slots = {
    default: []
  }
  for (const element of container.children) {
    let slot = element.getAttribute('slot')
    if (!slot) {
      slot = 'default'
    } else if (!Object.keys(slots).includes(slot)) {
      slots[slot] = []
    }
    slots[slot].push(element)
  }
  return slots
}
