import { SplitViewMaster }
	from '../../../src/components/splitview/components/master'

describe('SplitViewMaster', () => {
	it('can be instantiated', () => {
		const master = new SplitViewMaster()
		master.init()
		master.connectedCallback()
		expect(master.getAttribute('master-event') === '').toBeTruthy()
	})
	it('can be instantiated with master-event attribute', () => {
		const master = new SplitViewMaster()
		master.setAttribute('master-event', 'my-event')
		master.connectedCallback()
		expect(master.getAttribute('master-event') === 'my-event').toBeTruthy()
	})
	it('can throw event', () => {
		const master = new SplitViewMaster()
		master.innerHTML = /* html */ `
      <button btn>btn</button>
    `
		master.setAttribute('master-event', 'click')
		master.connectedCallback()
		// @ts-ignore
		master.querySelector('[btn]').click()
	})
})
