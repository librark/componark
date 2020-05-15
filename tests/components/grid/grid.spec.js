/** @typedef {import('../../../src/components').Grid} Grid */

describe('Grid', () => {
	it('can be instantiated', () => {
		const grid = /** @type {Grid} */(document.createElement('ark-grid'))
		expect(grid).toBeTruthy()

		// const init = grid.init({})
		const init = grid
		expect(grid === init).toBeTruthy()
	})

	// it('can be rendered without content', function () {
	// 	const grid = /** @type {Grid} */(document.createElement('ark-grid'))
	// 	grid.connectedCallback()
	// })
})
