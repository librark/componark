// /** @typedef {import('../../../src/components').GridItem} GridItem */

import { GridItem } from '../../../src/components/grid/components/grid.item'

describe('Grid Item', () => {
	it('can be instantiated', () => {
		// const grid = /** @type {GridItem} */(
		//   document.createElement('ark-grid-item'))

		const grid = new GridItem()
		expect(grid).toBeTruthy()

		if (grid) {
			var init = grid.init({})
			expect(grid === init).toBeTruthy()
		}
	})

	// it('can be rendered without content', function () {
	// 	const grid = /** @type {GridItem} */(
	// 		document.createElement('ark-grid-item'))
	// 	grid.connectedCallback()
	// })
})
