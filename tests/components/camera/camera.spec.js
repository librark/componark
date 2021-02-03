import { Camera } from 'components/camera'

jest.useFakeTimers()

const mockGlobal = {
  navigator: {
    mediaDevices: {
      getUserMedia: async (options) => {}
    }
  },
  MediaRecorder: function (stream) {
    this.stream = stream
    this.start = () => {}
    this.addEventListener = (type, callback) => {}
    this.stop = () => {}
    this.stream = {getTracks: () => [{stop: () => null}]}
  },
  FileReader: function () {
    const self = this
    this.readAsDataURL = (data) => setTimeout(
      () => self['onloadend'](), 1000)
    this.result = 'base64::data::result'

  },
  URL: {createObjectURL: (data) => 'mock://data/url'}
}

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

  xit('can stop recording', async () => {
    container.innerHTML = `
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')
    audio.init({global: mockGlobal})

    expect(audio.status).toEqual('idle')
    await audio.start()
    expect(audio.status).toEqual('recording')
    audio.stop()
    expect(audio.status).toEqual('done')
  })

  xit('can reset recording', async () => {
    container.innerHTML = `
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')
    audio.init({global: mockGlobal})

    expect(audio.status).toEqual('idle')
    await audio.start()
    expect(audio.status).toEqual('recording')
    audio.stop()
    expect(audio.status).toEqual('done')
    audio.reset()
    expect(audio.status).toEqual('idle')
    expect(audio.recorder).toBeNull()
  })

  xit('counts the ellapsed time of the recording', async () => {
    container.innerHTML = `
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')
    audio.init({global: mockGlobal})

    await audio.start()
    jest.runOnlyPendingTimers()

    const timer = audio.select('.ark-audio__timer')
    expect(timer.textContent).toEqual('00:01')
    jest.advanceTimersByTime(623000)
    expect(timer.textContent).toEqual('10:24')
  })

  xit('sets the dataURL (base64) property when stopped', async () => {
    container.innerHTML = `
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')
    audio.init({global: mockGlobal})

    await audio.start()
    audio.stop()

    audio._onData({data: new Blob(['Hello'], {type: 'text/plain'})})
    jest.runOnlyPendingTimers()

    expect(audio.dataURL).toEqual('base64::data::result')
    expect(audio.querySelector('.ark-audio__audio').src).toEqual(
      'mock://data/url')
  })
})
