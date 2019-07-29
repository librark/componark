import { Component } from '../../component'

export class SplitviewMaster extends Component {
	init (context) {
		this.masterEvent = this.masterEvent
		return super.init()
	}

	reflectedProperties () {
		return ['masterEvent']
	}

	render () {
		if (this.firstElementChild) {
			this.firstElementChild.addEventListener(
				this.masterEvent,
				this._onMasterEvent.bind(this)
			)
		}
		return super.render()
	}

	/** @argument {Event} event */
	_onMasterEvent (event) {
		event.stopImmediatePropagation()
		this.dispatchEvent(new CustomEvent('master:change', event))
	}
}
customElements.define('ark-splitview-master', SplitviewMaster)
