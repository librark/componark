import { listen, reflect } from '../../utils'

export class Component extends HTMLElement {
	constructor () {
		super()
		reflect(this, this.reflectedProperties())
		this.init({})
	}

	/** @param {Object} context @return {Component} */
	init (context = {}) {
		// HTML
		this.defaultContent = this.innerHTML
		return this
	}

	connectedCallback () {
		this.render()
		this.load()
	}

	/** @return {string[]} */
	reflectedProperties () {
		return []
	}

	/** @return {Component} */
	render () {
		listen(this)
		return this
	}

	/** @return {Promise<Component>} */
	async load () {
		return this
	}

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

	// ---------------------------------------------------------------------------
	//  Default Content
	// ---------------------------------------------------------------------------
	get defaultContent () {
		return this._defaultContent || this.innerHTML
	}

	set defaultContent (html) {
		this._defaultContent = this._defaultContent || html
	}
}
