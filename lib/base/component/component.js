import { define, listen, reflect, slot, keys } from '../utils/index.js'
import styles from '../styles/index.js'

const tag = 'ark-component'
export class Component extends globalThis.HTMLElement {
  constructor () {
    super()
    this.binding = 'listen'
    this.local = {}
    reflect(this, this.reflectedProperties())
  }

  /**
   * @param {string} tag
   * @param {CustomElementConstructor} element
   * @param {string} styles **/
  static define (tag, element, styles = null) {
    define(tag, element, styles)
  }

  /**
   * @param {object} styleMap
   * @return {string} **/
  styleNames (styleMap) {
    return keys(styleMap)
  }

  /**
   * @param {object} context
   * @return {Component} */
  init (context = {}) {
    return this
  }

  /** @return {string[]} */
  reflectedProperties () {
    return []
  }

  get slots () {
    return slot(this)
  }

  /** @param {string} content */
  set content (content) {
    this.innerHTML = content
  }

  /** @return {string} */
  get content () {
    return this.innerHTML
  }

  connectedCallback () {
    try {
      !(this.state || Object.keys(this.local).length) && this.init({})
      this.render()
    } catch (error) {
      this.emit('error', error)
      throw error
    }
    this.load({})
  }

  /** @return {Component} */
  render () {
    this.classList.add(this.tagName.toLowerCase())
    listen(this)
    return this
  }

  /** @param {object} context */
  async load (context = {}) {}

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
  emit (type, detail) {
    this.dispatchEvent(
      new globalThis.CustomEvent(type, {
        detail,
        bubbles: true,
        cancelable: true
      })
    )
  }

  /**
   * @param {string} resource
   * @return {any} */
  resolve (resource) {
    const event = new globalThis.CustomEvent('resolve', {
      detail: { resource },
      bubbles: true,
      cancelable: true
    })
    this.dispatchEvent(event)
    return event.detail[resource]
  }
}
Component.define(tag, Component, styles)
