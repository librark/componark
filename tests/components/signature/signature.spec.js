import { Signature } from '../../../src/components/signature'

describe('Signature', () => {
	it('can be instantiated', () => {
		const signature = new Signature()
		signature.init()
		signature.render()
		signature.load()
		signature.dataURL()
		signature.clear()
		signature.resizeCanvas()
		signature.disconnectedCallback()

		expect(signature.querySelector('canvas')).toBeTruthy()
	})

	it('can be resize Canvas', () => {
		const signature = new Signature()
		signature.init()
		signature.render()
		signature.global.devicePixelRatio = 0
		signature.resizeCanvas()

		expect(signature.querySelector('canvas')).toBeTruthy()
	})
})
