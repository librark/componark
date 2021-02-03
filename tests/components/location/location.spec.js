import { Location } from 'components/location'

const mockGlobal = () => ({
  navigator: {
    geolocation: {
      getCurrentPosition(resolve, reject, options) {
        const mockPosition = {
          coords: {
            latitude: 4,
            longitude: 72
          }
        }
        resolve(mockPosition)
      }
    }
  }
})

describe('Location', () => {
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
      <ark-location></ark-location>
    `
    const location = container.querySelector('ark-location')
    expect(location).toBeTruthy()

    expect(location).toBe(location.init())
  })

  it('can provide the user current position', async () => {
    container.innerHTML = `
      <ark-location></ark-location>
    `
    const location = container.querySelector('ark-location')
    location.init({global: mockGlobal()})

    const position = await location.getCurrentPosition()

    expect(position).toEqual({
      coords: {
        latitude: 4,
        longitude: 72
      }
    })
  })
})
