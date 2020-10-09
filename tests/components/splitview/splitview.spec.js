import { SplitView }
  from '../../../src/components/splitview/components/splitView'
import { SplitViewDetail }
  from '../../../src/components/splitview/components/detail'
import { SplitViewMaster }
  from '../../../src/components/splitview/components/master'

describe('SplitView', () => {
  it('can be instantiated without elements', () => {
    const splitview = new SplitView()
    splitview.init().render().load()

    // @ts-ignore
    splitview.renderDetail()

    expect(splitview).toBeTruthy()
  })

  it('can be instantiated with elements', () => {
    const splitview = new SplitView()
    const master = new SplitViewMaster()
    const detail = new SplitViewDetail()

    master.render()
    detail.render()

    splitview.appendChild(master)
    splitview.appendChild(detail)

    splitview.init().render().load()

    splitview.renderDetail({})

    splitview.addEventListener('test', event => {
      expect(event['detail'].data).toBeTruthy()
    })

    const event = new CustomEvent('test', { detail: { data: true } })
    splitview._onMasterChange(event)

    splitview._onMasterChange(new CustomEvent(''))
  })
})
