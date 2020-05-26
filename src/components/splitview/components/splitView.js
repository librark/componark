/**
 * @typedef {import('./detail.js').SplitViewDetail} SplitViewDetail
 * @typedef {import('./master.js').SplitViewMaster} SplitViewMaster
 **/

import { Component } from '../../component'

export class SplitView extends Component {
	init (context = {}) {
		this.detailTitle = context.title || this.detailTitle

		this.detailBackButtonIcon = context.backButtonIcon ||
     this.detailBackButtonIcon

		return super.init()
	}

	render () {
		return super.render()
	}

	load () {
		if (this.master) {
			this.master.addEventListener(
				'master:change',
				this._onMasterChange.bind(this)
			)
		}

		return super.load()
	}

	// --------------------------------------------------------------------------

	/** @return {SplitViewMaster} */
	get master () {
		return /** @type {SplitViewMaster} */ (this.select('ark-splitview-master'))
	}

	/** @return {SplitViewDetail} */
	get detail () {
		return /** @type {SplitViewDetail} */ (this.select('ark-splitview-detail'))
	}

	// --------------------------------------------------------------------------

	/** @param {CustomEvent} event */
	_onMasterChange (event) {
		event.stopImmediatePropagation()

		const context = event.detail || {}
		this._renderDetail(context)

		this.dispatchEvent(new CustomEvent('detail:change', event))
	}

	/** @param {Object} context */
	_renderDetail (context) {
		// if (!this.detail && !this.detail.init) return
		if (!this.detail || !this.detail.init) return

		context.title = context.title || this.detailTitle
		context.backButtonIcon = context.backButtonIcon ||
     this.detailBackButtonIcon

		this.detail.init(context).render()
		this.detail.show()
	}
}
customElements.define('ark-splitview', SplitView)
