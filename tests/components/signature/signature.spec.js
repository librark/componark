import { jest } from '@jest/globals'
import '../../../src/components/signature/index.js'

jest.mock('signature_pad', () => jest.fn(
  () => ({ 
    clear: () => null, 
    fromDataURL: (dataURL) => null
  })))

class MockSignaturePad {
  constructor(element, options) {
    this.element = element
    this.options = options
  }

  clear() {}

  fromDataURL(dataURL) {}
}

// @ts-ignore
window.HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  scale: (x, y) => null, 
  drawImage: (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) => null
}))

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
    <ark-signature width="90hw" height="90vw"></ark-signature>
    `

    const lib = MockSignaturePad
    const signature = container.querySelector('ark-signature')
    signature.init({lib}).render()

    const canvas = signature.select('canvas')

    expect(signature.signaturePad.element).toBe(canvas)
    expect(signature.signaturePad.options).toBeTruthy()
  })

  it('returns its data as a dataURL', () => {
    container.innerHTML = `
    <ark-signature></ark-signature>
    `

    const lib = MockSignaturePad
    const signature = container.querySelector('ark-signature')
    signature.init({lib}).render()

    const dataURL = signature.dataURL()

    expect(dataURL).toBeTruthy()
  })

  it('is marked on touchend and mouseup canvas events', () => {
    container.innerHTML = `
    <ark-signature></ark-signature>
    `

    const lib = MockSignaturePad
    const signature = container.querySelector('ark-signature')
    signature.init({lib}).render()


    const canvas = signature.canvas

    expect(signature.dirty).toBeFalsy()
    canvas.dispatchEvent(new Event('touchend'))
    expect(signature.dirty).toBeTruthy()

    signature._dirty = false

    expect(signature.dirty).toBeFalsy()
    canvas.dispatchEvent(new Event('mouseup'))
    expect(signature.dirty).toBeTruthy()
  })

})
