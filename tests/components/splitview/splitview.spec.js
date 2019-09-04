/**
 * @typedef {import('../../../src/components').Splitview} Splitview
 **/

import {
	Splitview
} from '../../../src/components/splitview/components/splitview'
import {
	SplitviewDetail
} from '../../../src/components/splitview/components/detail'
import {
	SplitviewMaster
} from '../../../src/components/splitview/components/master'

describe('Splitview', () => {
	it('can be instantiated without elements', () => {
		const splitview = new Splitview()
		splitview.init()
		splitview.connectedCallback()
		splitview._onMasterChange(new CustomEvent(''))
		expect(!splitview.innerHTML.trim().length).toBeTruthy()
	})

	it('can be instantiated with elements', () => {
		const splitview = new Splitview()
		const master = new SplitviewMaster()
		const detail = new SplitviewDetail()

		splitview.append(master)
		splitview.append(detail)

		splitview.render().load()

		splitview.addEventListener('test', event => {
			expect(event.detail.data).toBeTruthy()
		})

		const event = new CustomEvent('test', { detail: { data: true } })
		splitview._onMasterChange(event)

		splitview._onMasterChange(new CustomEvent(''))

		splitview._renderDetail({})
	})
})
