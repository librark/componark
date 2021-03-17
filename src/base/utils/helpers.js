import { camelToKebab } from './format'

/** @param {HTMLElement} self */
export function listen (self) {
  const binding = self['binding']
  const elements = self.querySelectorAll(`[${binding}]`)
  for (const element of elements) {
    for (const attribute of Array.from(element.attributes)) {
      if (attribute.name.startsWith('on-')) {
        const eventName = attribute.name.replace('on-', '').trim()
        let handler = self[attribute.value]

        const [assignment] = attribute.value.match(/[^{{]+(?=\}})/g) || []

        if (assignment) {
          let [objectPath, eventPath] = assignment.split('=')
          eventPath = eventPath || 'detail'
          handler = function (event) {
            set(this, objectPath.trim(), get(event, eventPath))
          } 
        } 

        if (!handler) continue

        element.addEventListener(eventName, handler.bind(self))
        if (element.hasAttribute(binding)) element.removeAttribute(binding)
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
      set: value => {
        if (value !== undefined) {
          self.setAttribute(attribute, value)
        }
      }
    }
  }
  Object.defineProperties(self, descriptors)
}

/** @param {Object} object @param {string} path @param {any} value */
export function set (object, path, value) {
  const pathArray = path.match(/([^[.\]])+/g)

  pathArray.reduce((accumulator, key, index) => {
    if (accumulator[key.trim()] === undefined) accumulator[key.trim()] = {}
    if (index === pathArray.length - 1) accumulator[key.trim()] = value
    return accumulator[key.trim()]
  }, object)
}

/** @param {Object} object @param {string} path @param {any} fallback */
export function get (object, path, fallback) {
  const pathArray = path.match(/([^[.\]])+/g)

  return pathArray.reduce((accumulator, key) => accumulator &&
    accumulator[key.trim()], object) || fallback
}
