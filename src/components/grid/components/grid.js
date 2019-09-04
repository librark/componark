import { Component } from '../../component'

export class Grid extends Component {
	init (context = {}) {
		this.cols = context['cols'] || this.cols || 0
		this.gap = context['gap'] || this.gap || '0px'
		return super.init()
	}

	reflectedProperties () {
		return ['cols', 'gap']
	}

	render () {
		this._elementStyle()
		return super.render()
	}

	_elementStyle () {
		this.style.display = 'grid'

		this.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`
		this.style.gridTemplateRows = `auto`

		this.style.gridGap = `${this.gap}`
	}
}
customElements.define('ark-grid', Grid)
