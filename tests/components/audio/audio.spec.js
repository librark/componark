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
})
