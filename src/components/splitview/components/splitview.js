/**
 * @typedef {import('./detail.js').SplitviewDetail} SplitviewDetail
 * @typedef {import('./master.js').SplitviewMaster} SplitviewMaster
 **/

import { Component } from '../../component'

export class Splitview extends Component {
	init (context) {
		// -------------------------------------------------------------------------
		// Detail
		// -------------------------------------------------------------------------
		this.detailTitle = context['title']
		this.detailBackButtonIcon = context['backButtonIcon']

		// -------------------------------------------------------------------------
		// Local
		// -------------------------------------------------------------------------
		this.detailPercentage = context['detailPercentage'] || this.detailPercentage

		return super.init()
	}

	reflectedProperties () {
		return ['detailPercentage']
	}

	render () {
		this._setDetailWidth()
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

	/** @return {SplitviewMaster} */
	get master () {
		return /** @type {SplitviewMaster} */ (this.select('ark-splitview-master'))
	}

	/** @return {SplitviewDetail} */
	get detail () {
		return /** @type {SplitviewDetail} */ (this.select('ark-splitview-detail'))
	}

	// ---------------------------------------------------------------------------

	/** @param {Event} event */
	_onMasterChange (event) {
		event.stopImmediatePropagation()

		const context = event['detail'] || {}
		this._renderDetail(context)

		this.dispatchEvent(new CustomEvent('detail:change', event))
	}

	/** @param {Object} context */
	_renderDetail (context) {
		context['title'] = context['title'] || this.detailTitle
		context['backButtonIcon'] = (
			context['backButtonIcon'] || this.detailBackButtonIcon
		)

		if (this.detail && this.detail.init) {
			this.detail.init(context).render()
			this.detail.show()
		}
	}

	_setDetailWidth () {
		const percentage = parseInt(this.detailPercentage) || 50

		if (this.master) this.master.style.width = `${100 - percentage}%`
		if (this.detail) this.detail.style.width = `${percentage}%`
	}
}
customElements.define('ark-splitview', Splitview)
