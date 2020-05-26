import { Grid } from '../../../src/components/grid/'

describe('Grid', () => {
	it('can be instantiated', () => {
		const grid = new Grid()
		grid.init().render()
		expect(grid).toBeTruthy()
	})
})
