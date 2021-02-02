import { Signature } from '../../../src/components/signature'

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
    const signature = document.querySelector('ark-signature')
    expect(signature).toBeTruthy()
    expect(signature).toBe(signature.init())
    expect(signature.canvas).toBeTruthy()


    // signature.init()
    // signature.render()
    // signature.load()

    // signature.dataURL()

    // signature.clear()

    // @ts-ignore
    // signature.resizeCanvas()

    // @ts-ignore
    // signature.isDirty()

    // signature.disconnectedCallback()

    // expect(signature.querySelector('canvas')).toBeTruthy()
  })

  it('can be resize Canvas', () => {
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

  it('can be responsive', () => {
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

  it('can be width and height', () => {
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
