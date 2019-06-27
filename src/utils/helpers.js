import { camelToKebab } from './format'

/** @param {HTMLElement} self */
export function listen (self) {
  const elements = self.querySelectorAll('[listen]')
  for (const element of elements) {
    for (const attribute of element.attributes) {
      if (attribute.name.startsWith('on-')) {
        const event = attribute.name.replace('on-', '')
        const handler = self[attribute.value]
        if (!handler) continue
        element.addEventListener(event, handler.bind(self))
        element.removeAttribute('listen')
      }
    }
  }
}

/** @param {HTMLElement} self @param {string[]} properties */
export function reflect (self, properties) {
  /** @type {PropertyDescriptorMap} */
  const descriptors = {}
  for (const property of properties) {
    const attribute = camelToKebab(property)
    descriptors[property] = {
      get: () => self.getAttribute(attribute) || '',
      set: (value) => {
        if (value !== undefined) {
          self.setAttribute(attribute, value)
        }
      }
    }
  }
  Object.defineProperties(self, descriptors)
}
