import { Component } from '../../component'

export class GridItem extends Component {
	init (context = {}) {
		this.rows = context.rows || this.rows || 1
		this.cols = context.cols || this.cols || 1
		return super.init()
	}

	reflectedProperties () {
		return ['rows', 'cols']
	}

	render () {
		this._elementStyle()
		return super.render()
	}

	_elementStyle () {
		this.style.gridRowStart = `${this.rows} span`
		this.style.gridColumnStart = `${this.cols} span`
	}
}
customElements.define('ark-grid-item', GridItem)
