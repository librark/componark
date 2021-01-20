import { Audio } from 'components/audio'

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

  it('can start recording', () => {
    container.innerHTML = `
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')

    expect(audio.status).toEqual('idle')
    audio.start()
    expect(audio.status).toEqual('recording')
  })

  it('can stop recording', () => {
    container.innerHTML = `
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')

    expect(audio.status).toEqual('idle')
    audio.start()
    expect(audio.status).toEqual('recording')
    audio.stop()
    expect(audio.status).toEqual('done')
  })

  it('can reset recording', () => {
    container.innerHTML = `
      <ark-audio></ark-audio>
    `
    const audio = container.querySelector('ark-audio')

    expect(audio.status).toEqual('idle')
    audio.start()
    expect(audio.status).toEqual('recording')
    audio.stop()
    expect(audio.status).toEqual('done')
    audio.reset()
    expect(audio.status).toEqual('idle')
  })
})
