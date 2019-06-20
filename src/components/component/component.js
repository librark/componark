export class Component extends HTMLElement {
  constructor () {
    super()
    this.init({})
  }

  /** @param {Object} context @return {Component} */
  init (context) {
    return this
  }

  connectedCallback () {
    reflect(this, this.properties())
    this.render()
  }

  /** @return {string[]} */
  properties () {
    return []
  }

  /** @return {Component} */
  render () {
    this.load()
    listen(this)
    return this
  }

  load () {

  }

  /**
   * @param {string} selectors
   * @return {Component} */
  select (selectors) {
    return (/** @type {Component} */ (this.querySelector(selectors)))
  }

  /**
   * @param {string} selectors
   * @return {NodeListOf<Component>} */
  selectAll (selectors) {
    return (/** @type {NodeListOf<Component>} */ (
      this.querySelectorAll(selectors)))
  }
}

/** @param {Component} self */
function listen (self) {
  const elements = self.querySelectorAll('[listen]')
  for (const element of elements) {
    for (const attribute of element.attributes) {
      if (attribute.name.startsWith('on-')) {
        const event = attribute.name.replace('on-', '')
        const handler = self[attribute.value]
        if (!handler) continue
        element.addEventListener(event, handler.bind(self))
      }
    }
  }
}

/** @param {Component} self @param {string[]} properties */
function reflect (self, properties) {
  /** @type {PropertyDescriptorMap} */
  const descriptors = {}
  for (const property of properties) {
    descriptors[property] = {
      get: () => self.getAttribute(property),
      set: (value) => self.setAttribute(property, value)
    }
  }
  Object.defineProperties(self, descriptors)
}
