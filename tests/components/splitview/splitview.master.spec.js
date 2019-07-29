import { SplitviewMaster } from '../../../src/components/splitview/components/master'

describe('SplitviewMaster', () => {
	it('can be instantiated', () => {
		const master = new SplitviewMaster()
		master.init({})
		master.connectedCallback()
		expect(master.getAttribute('master-event') === '').toBeTruthy()
	})
	it('can be instantiated with master-event attribute', () => {
		const master = new SplitviewMaster()
		master.setAttribute('master-event', 'my-event')
		master.connectedCallback()
		expect(master.getAttribute('master-event') === 'my-event').toBeTruthy()
	})
	it('can throw event', () => {
		const master = new SplitviewMaster()
		master.innerHTML = /* html */ `
      <button btn>btn</button>
    `
		master.setAttribute('master-event', 'click')
		master.connectedCallback()
		// @ts-ignore
		master.querySelector('[btn]').click()
	})
})
