import { Audio } from 'components/audio'

const mockGlobal = {
  navigator: {
    mediaDevices: {
      getUserMedia: async (options) => {}
    }
  },
  MediaRecorder: function (stream) {
    this.stream = stream,
    this.start = () => {}
  }
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
    expect(audio).toBeTruthy()
  })

  it('can start recording', async () => {
    container.innerHTML = `
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')
    audio.init({global: mockGlobal})

    expect(audio.status).toEqual('idle')
    await audio.start()
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
    await audio.start()
    expect(audio.status).toEqual('recording')
    audio.stop()
    expect(audio.status).toEqual('done')
    expect(audio.recorder).toBeNull()
  })

  xit('can reset recording', async () => {
    container.innerHTML = `
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')

    expect(audio.status).toEqual('idle')
    await audio.start()
    expect(audio.status).toEqual('recording')
    await audio.stop()
    expect(audio.status).toEqual('done')
    audio.reset()
    expect(audio.status).toEqual('idle')
  })
})
