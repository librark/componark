/**
 * @typedef {import('./detail.js').SplitviewDetail} SplitviewDetail
 * @typedef {import('./master.js').SplitviewMaster} SplitviewMaster
 **/

import './master'

import { Component } from '../../component'
import { SplitviewDetail } from './detail'

export class Splitview extends Component {
	init (context) {
		// -------------------------------------------------------------------------
		// Detail
		// -------------------------------------------------------------------------
		this.detailTitle = context['title']
		this.detailTemplate = context['detailTemplate']
		this.detailBackButtonIcon = context['backButtonIcon']
		this.detailDefaultTemplate = context['defaultTemplate']

		this.detailPercentage = context['detailPercentage'] || this.detailPercentage

		return super.init()
	}

	reflectedProperties () {
		return ['detailPercentage']
	}

	render () {
		if (this.master && this.detailTemplate) {
			this.innerHTML = /* html */ `
        <div data-master-container class="master-container">
          ${this.defaultContent}
        </div>
      `
			this._listenMaster()
			this.append(this._splitviewDetail())
			this._setDetailWidth()
		}
		return super.render()
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
	/** @argument {Event} event */
	_onMasterChange (event) {
		event.stopImmediatePropagation()
		const data = event['detail'] || null
		this.detail.init({ data: data }).render()
		this.dispatchEvent(new CustomEvent('detail:change', event))
	}

	_listenMaster () {
		this.master.addEventListener(
			'master:change',
			this._onMasterChange.bind(this)
		)
	}

	_setDetailWidth () {
		const master = /** @type {HTMLElement} */ (this.querySelector(
			'[data-master-container]'
		))
		const percentage = parseInt(this.detailPercentage) || 50

		master.style.width = `${100 - percentage}%`
		this.detail.style.width = `${percentage}%`
	}

	_splitviewDetail () {
		const detail = new SplitviewDetail()
		detail
			.init({
				template: this.detailTemplate,
				title: this.detailTitle || '',
				defaultTemplate: this.detailDefaultTemplate,
				backButtonIcon: this.detailBackButtonIcon
			})
			.render()
		return detail
	}
}
customElements.define('ark-splitview', Splitview)
