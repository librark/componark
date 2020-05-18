/** @typedef {import('../../../src/components').Icon} Icon */

describe('Icon', () => {
	it('can be instantiated', () => {
		const icon = /** @type {Icon} */(document.createElement('ark-icon'))
		expect(icon).toBeTruthy()
		// const init = icon.init()
		// expect(icon === init).toBeTruthy()
	})

	// it('can be instantiated', () => {
	// 	const icon = /** @type {Icon} */(document.createElement('ark-icon'))
	// 	expect(icon).toBeTruthy()
	// 	const init = icon.init()
	// 	expect(icon === init).toBeTruthy()
	// })

	// it('can be rendered with default variables', function () {
	// 	const icon = /** @type {Icon} */(document.createElement('ark-icon'))
	// 	icon.connectedCallback()
	// 	const iconElement = icon.querySelector('i')
	// 	expect(iconElement).toBeTruthy()
	// })

	// it('can be rendered with undefined variables', function () {
	// const icon = /** @type {Icon} */(document.createElement('ark-icon'))
	// icon.type = 'mat'
	// icon.init({})
	// icon.render()

	// expect(icon.querySelector('.material-icons')).toBeTruthy()
	// })
})
