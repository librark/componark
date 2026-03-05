import { define, listen, reflect, slot, keys } from '../utils/index.js'
import styles from '../styles/index.js'

const tag = 'ark-component'
export class Component extends globalThis.HTMLElement {
  constructor () {
    super()
    this.binding = 'listen'
    this.local = {}
    this._isConnected = false
    this._cleanupCallbacks = []
    this._needsBinding = true
    this.global = globalThis
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
    this._needsBinding = true
  }

  /** @return {string} */
  get content () {
    return this.innerHTML
  }

  connectedCallback () {
    this._isConnected = true
    try {
      !Boolean(Object.keys(this.local).length) && this.init({})
      this.render()
    } catch (error) {
      this.emit('error', this._enhanceError(error, 'init-render'))
      throw error
    }
    try {
      const load = this.load({})
      if (load && typeof load.catch === 'function') {
        load.catch(error => {
          this.emit('error', this._enhanceError(error, 'load'))
        })
      }
    } catch (error) {
      this.emit('error', this._enhanceError(error, 'load'))
      throw error
    }
  }

  disconnectedCallback () {
    this._isConnected = false
    this._cleanup()
  }

  /**
   * @param {Function} callback
   * @return {Function} */
  registerCleanup (callback) {
    if (!callback || typeof callback !== 'function') return () => {}

    this._cleanupCallbacks.push(callback)
    return () => {
      const index = this._cleanupCallbacks.indexOf(callback)
      if (index === -1) return
      this._cleanupCallbacks.splice(index, 1)
    }
  }

  /** @return {Component} */
  render () {
    this.classList.add(this.tagName.toLowerCase())
    if (this._needsBinding) {
      listen(this)
      this._needsBinding = false
    }
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
    this.dispatchEvent(this._createEvent(type, detail, {
      bubbles: true,
      cancelable: true
    }))
  }

  /**
   * @param {string} resource
   * @return {any} */
  resolve (resource) {
    const event = this._createEvent('resolve', { resource }, {
      bubbles: true,
      cancelable: true
    })
    this.dispatchEvent(event)
    return event.detail[resource]
  }

  /**
   * @param {any} detail
   * @param {string} phase
   * @return {Error} */
  _enhanceError (detail, phase) {
    if (!detail) return detail

    const error = detail instanceof Error ? detail : new Error(
      `${detail.message || detail}`
    )
    error.phase = phase
    error.component = this.tagName
    return error
  }

  _cleanup () {
    const callbacks = [...this._cleanupCallbacks]
    this._cleanupCallbacks = []

    for (const callback of callbacks) {
      try {
        callback()
      } catch (error) {
        this.emit('error', this._enhanceError(error, 'cleanup'))
      }
    }
  }

  /**
   * @param {string} type
   * @param {any} detail
   * @param {{ bubbles?: boolean, cancelable?: boolean }} options */
  _createEvent (type, detail, options = {}) {
    const contextGlobal = this.global || {}
    const global = (typeof contextGlobal.CustomEvent === 'function' ||
      typeof contextGlobal.Event === 'function') ? contextGlobal : globalThis
    const { bubbles = true, cancelable = true } = options
    if (typeof global.CustomEvent === 'function') {
      return new global.CustomEvent(type, { detail, bubbles, cancelable })
    }

    if (typeof global.Event === 'function') {
      const event = new global.Event(type, { bubbles, cancelable })
      event.detail = detail
      return event
    }

    return {
      type,
      bubbles,
      cancelable,
      detail,
      stopPropagation: () => {},
      preventDefault: () => {}
    }
  }
}
Component.define(tag, Component, styles)
