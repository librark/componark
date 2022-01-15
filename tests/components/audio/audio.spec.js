import { jest } from '@jest/globals'
import '../../../src/components/audio/index.js'

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

describe('Audio', () => {
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
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')
    audio.init()
    expect(audio).toBeTruthy()
  })

  it('can start recording', async () => {
    container.innerHTML = `
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')
    audio.init({global: mockGlobal})

    expect(audio.status).toEqual('idle')
    await audio.start(new Event('click'))
    expect(audio.status).toEqual('recording')
    expect(audio.recorder).toBeTruthy()
  })

  it('can stop recording', async () => {
    container.innerHTML = `
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')
    audio.init({global: mockGlobal})

    expect(audio.status).toEqual('idle')
    await audio.start(new Event('click'))
    expect(audio.status).toEqual('recording')
    audio.stop(new Event('click'))
    expect(audio.status).toEqual('done')
  })

  it('can reset recording', async () => {
    container.innerHTML = `
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')
    audio.init({global: mockGlobal})

    expect(audio.status).toEqual('idle')
    await audio.start(new Event('click'))
    expect(audio.status).toEqual('recording')
    audio.stop(new Event('click'))
    expect(audio.status).toEqual('done')
    audio.reset(new Event('click'))
    expect(audio.status).toEqual('idle')
    expect(audio.recorder).toBeNull()
  })

  it('counts the ellapsed time of the recording', async () => {
    container.innerHTML = `
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')
    audio.init({global: mockGlobal})

    await audio.start(new Event('click'))
    jest.runOnlyPendingTimers()

    const timer = audio.select('.ark-audio__timer')
    expect(timer.textContent).toEqual('00:01')
    jest.advanceTimersByTime(623000)
    expect(timer.textContent).toEqual('10:24')
  })

  it('sets the dataURL (base64) property when stopped', async () => {
    container.innerHTML = `
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')
    audio.init({global: mockGlobal})

    await audio.start(new Event('click'))
    audio.stop(new Event('click'))

    audio._onData({data: new Blob(['Hello'], {type: 'text/plain'})})
    jest.runOnlyPendingTimers()

    expect(audio.dataURL).toEqual('base64::data::result')
    expect(audio.querySelector('.ark-audio__audio').src).toEqual(
      'mock://data/url')
  })
})
