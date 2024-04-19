import { camelToKebab } from './format.js'

/** @param {HTMLElement} self */
export function listen (self) {
  /** @ts-ignore */
  const binding = self.binding
  const elements = self.querySelectorAll(`[${binding}]`)
  for (const element of elements) {
    for (const attribute of Array.from(element.attributes)) {
      if (attribute.name.startsWith('on-')) {
        const [reference, at] = attribute.value.split('@').map(
          item => item.trim())
        const [value, field] = reference.split('%').map(
          item => item.trim())

        let handler = self[value]
        const [assignment] = value.match(/[^{{]+(?=\}})/g) || []

        if (assignment) {
          const [content, pipe] = assignment.split('|').map(
            item => item.trim())
          let [objectPath, eventPath] = content.split('=')
          eventPath = eventPath?.trim() || 'target.value'
          handler = function (event) {
            if (pipe?.toLocaleLowerCase() !== 'object') {
              return set(this, objectPath.trim(), transform(pipe, get(
                event, eventPath, get(event, 'detail', ''))))
            }
            Object.assign(this[objectPath.trim()], event.detail)
          }
        }

        if (!handler && !at) continue

        const catchingHandler = async function (event) {
          try {
            let receiver = this
            if (at) {
              receiver = this.querySelector(at)
              if (!receiver) return
              handler = receiver[value]
            }
            const data = field ? get(event, field) : event
            return await Promise.resolve(handler.bind(receiver)(data))
          } catch (error) {
            this.dispatchEvent(
              new globalThis.CustomEvent(
                'error', { detail: error, bubbles: true, cancelable: true }
              ))
          }
        }

        const eventName = attribute.name.replace('on-', '').trim()
        element.addEventListener(eventName, catchingHandler.bind(self))
        element.removeAttribute(binding)
      }
    }
  }
}

/** @param {HTMLElement} self  */
function provide (self) {
  /** @ts-ignore */
  if (!self.provide) return
  self.addEventListener('resolve', (/** @type {CustomEvent} */ event) => {
    const resource = event.detail.resource
    /** @ts-ignore */
    const dependency = self.provide(resource)
    if (dependency === undefined) return
    event.detail[resource] = dependency
  })
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
  provide(self)
}

function transform (pipe, value) {
  return {
    string: String,
    boolean: Boolean,
    number: Number
  }[pipe?.toLowerCase() || 'string'](value)
}

/** @param {object} object @param {string} path @param {any} value */
export function set (object, path, value) {
  const pathArray = path.match(/([^[.\]])+/g)

  pathArray.reduce((accumulator, key, index) => {
    if (accumulator[key.trim()] === undefined) accumulator[key.trim()] = {}
    if (index === pathArray.length - 1) accumulator[key.trim()] = value
    return accumulator[key.trim()]
  }, object)
}

/** @param {object} object @param {string} path @param {any} fallback */
export function get (object, path, fallback) {
  const pathArray = path.match(/([^[.\]])+/g)

  return pathArray.reduce((accumulator, key) => accumulator &&
    accumulator[key.trim()], object) || fallback
}

/** @param {object} object @return {string} */
export function keys (object) {
  return Object.keys(object).filter(
    key => Boolean(object[key])).join(' ')
}
