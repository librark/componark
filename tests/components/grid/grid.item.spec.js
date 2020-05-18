import { GridItem } from '../../../src/components/grid/components/grid.item'

describe('Grid Item', () => {
	it('can be instantiated', () => {
		const grid = new GridItem()
		grid.init().render()

		expect(grid).toBeTruthy()

		if (grid) {
			const init = grid.init()
			expect(grid === init).toBeTruthy()
		}
	})
})
