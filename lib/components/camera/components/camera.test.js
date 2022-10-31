import './camera.js'

const mockGlobal = () => ({
  navigator: {
    mediaDevices: {
      __stops: 0,
      async getUserMedia(_options) {
        return { getTracks: () => [{stop: () => {this.__stops += 1}}] }
      }
    }
  }
})

describe('Camera', () => {
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
      <ark-camera></ark-camera>
    `
    const camera = container.querySelector('ark-camera')
    expect(camera).toBeTruthy()

    expect(camera).toBe(camera.init())
  })

  it('sets its dimensions on canplay event', async () => {
    container.innerHTML = `
      <ark-camera width="50" height="80"></ark-camera>
    `
    const camera = container.querySelector('ark-camera')
    const video = camera.select('video')
    const canvas = camera.select('canvas')

    video.dispatchEvent(new Event('canplay'))

    expect(video.width).toEqual(50)
    expect(video.height).toEqual(80)

    expect(canvas.width).toEqual(50)
    expect(canvas.height).toEqual(80)
  })

  it('can start video recording', async () => {
    container.innerHTML = `
      <ark-camera></ark-camera>
    `
    const camera = container.querySelector('ark-camera')
    camera.init({global: mockGlobal()})

    await camera.start()

    expect(camera.video.srcObject.getTracks()).toBeTruthy()
  })

  it('can stop video recording', async () => {
    container.innerHTML = `
      <ark-camera></ark-camera>
    `
    const camera = container.querySelector('ark-camera')
    const global = mockGlobal()
    camera.init({global: global})

    await camera.start()

    camera.stop()

    expect(global.navigator.mediaDevices.__stops).toEqual(1)
  })

  it('can set the camera orientation', async () => {
    container.innerHTML = `
      <ark-camera></ark-camera>
    `
    const camera = container.querySelector('ark-camera')
    const global = mockGlobal()
    camera.init({global: global})

    await camera.setCameraOrientation('environment')

    expect(camera.facingMode).toEqual('environment')
  })

  it('gets the dataURL (base64) of its containing canvas', async () => {
    container.innerHTML = `
      <ark-camera></ark-camera>
    `
    const camera = container.querySelector('ark-camera')
    camera.init({global: mockGlobal()})

    const data = camera.dataURL()

    expect(data).toBeTruthy()
  })
})
