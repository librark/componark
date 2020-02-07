import { Signature } from '../../../src/components/signature'

describe('Signature', () => {
  it('can be instantiated', () => {
    const signature = new Signature()
    signature.init()
    signature.render()
    signature.load()
    signature.getSrc()
    signature.clear()
  })
})
