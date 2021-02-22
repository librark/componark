import { Signature } from '../../../src/components/signature'

class MockSignaturePad {
  constructor(element, options) {
    this.element = element
    this.options = options
  }
}

jest.mock('signature_pad', () => jest.fn())

describe('Signature', () => {
  let container = null
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it('can be instantiated', () => {
    container.innerHTML = `
    <ark-signature></ark-signature>
    `
    const signature = container.querySelector('ark-signature')
    expect(signature).toBeTruthy()
    expect(signature).toBe(signature.init())
    expect(signature.canvas).toBeTruthy()

  })

  it('is applied on a canvas element', () => {
    container.innerHTML = `
    <ark-signature></ark-signature>
    `

    const lib = MockSignaturePad
    const signature = container.querySelector('ark-signature')
    signature.init({lib}).render()

    const canvas = signature.select('canvas')

    expect(signature.signaturePad.element).toBe(canvas)
    expect(signature.signaturePad.options).toBeTruthy()
  })

  xit('can be resize Canvas', () => {
    const signature = new Signature()

    signature.init()
    signature.render()
    signature.load()

    signature.dataURL()

    signature.clear()

    // @ts-ignore
    signature.global.devicePixelRatio = 0

    expect(signature.querySelector('canvas')).toBeTruthy()
  })

  xit('can be responsive', () => {
    const signature = new Signature()

    signature.init()
    signature.render()
    signature.load()

    // @ts-ignore
    signature.resizeCanvas(true)

    // @ts-ignore
    signature.global.devicePixelRatio = 0

    expect(signature.querySelector('canvas')).toBeTruthy()
  })

  xit('can be width and height', () => {
    const signature = new Signature()

    signature.init({ height: '100', width: '100' })

    signature.render()
    signature.load()

    // @ts-ignore
    signature.resizeCanvas(true)

    // @ts-ignore
    signature.global.devicePixelRatio = 0

    expect(signature.querySelector('canvas')).toBeTruthy()
  })
})
