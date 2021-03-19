import { define, listen, reflect, slot } from '../utils'

export class Component extends HTMLElement {
  constructor () {
    super()
    this.binding = 'listen'
    reflect(this, this.reflectedProperties())
    this.init({})
  }

  /** 
   * @param {string} tag
   * @param {CustomElementConstructor} element
   * @param {string} styles **/
  static define(tag, element, styles = null) {
    define(tag, element, styles)
  }

  /**
   * @param {Object<string, any>} context
   * @return {Component} */
  init (context = {}) {
    return this
  }

  /** @return {string[]} */
  reflectedProperties () {
    return []
  }

  slots() {
    return slot(this)
  }

  /** @param {string} content */
  set content(content) {
    this.innerHTML = content
  }

  /** @return {string} */
  get content() {
    return this.innerHTML
  }

  connectedCallback () {
    this.update()
  }

  async update() {
    try {
      this.render()
      await this.load()
    } catch (error) {
      this.emit('error', error)
      throw error 
    }
  }

  /** @return {Component} */
  render () {
    this.className = this.tagName.toLowerCase()
    listen(this)
    return this
  }

  async load () { }

  /**
   * @param {string} selectors
   * @return {Component} */
  select (selectors) {
    return /** @type {Component} */ (this.querySelector(selectors))
  }

  /**
   * @param {string} selectors
   * @return {NodeListOf<Component>} */
  selectAll (selectors) {
    return /** @type {NodeListOf<Component>} */ (this.querySelectorAll(
      selectors
    ))
  }

  /**
   * @param {string} type
   * @param {any} detail */
  emit(type, detail) {
    this.dispatchEvent(new CustomEvent(type, { 
      detail, bubbles: true, cancelable: true }))
  }
}
