import { listen, reflect } from '../../utils'

export class Component extends HTMLElement {
  constructor () {
    super()
    reflect(this, this.reflectedProperties())
    this.init({})
  }

  /**
   *  @param {Object} context
   *  @return {Component} */
  init (context = {}) {
    return this
  }

  connectedCallback () {
    this.render()
    this.load()?.catch(error => {
      console.log(`{this.tagName}: loading error!`)
      throw error 
    })
  }

  /** @return {string[]} */
  reflectedProperties () {
    return []
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
