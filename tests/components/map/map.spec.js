import { Map } from 'components/map'

const mockGlobal = () => ({
  navigator: {
    geolocation: {
      getCurrentPosition(resolve, reject, options) {
        const mockPosition = {
          coords: {
            latitude: 4,
            longitude: 72,
          },
        }
        resolve(mockPosition)
      },
    },
  },
})

describe('Location', () => {
  let container = null
  jest.useFakeTimers()
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
      <ark-map></ark-map>
    `
    const map = container.querySelector('ark-map')
    jest.runAllTimers()

    expect(map).toBeTruthy()
    expect(map).toBe(map.init())
  })

  it('can define its width and height', () => {
    container.innerHTML = `
      <ark-map height="70vh" width="50vw"></ark-map>
    `
    const map = container.querySelector('ark-map')

    expect(map.style.height).toEqual('70vh')
    expect(map.style.width).toEqual('50vw')
  })

  it('can define its latitude, longitude and zoom', () => {
    container.innerHTML = `
      <ark-map lat="4" lon="72.5", zoom="14"></ark-map>
    `
    const map = container.querySelector('ark-map')

    expect(map.lon).toEqual('72.5')
    expect(map.lat).toEqual('4')
    expect(map.zoom).toEqual('14')
  })

  it('can position a marker inside it', () => {
    container.innerHTML = `
      <ark-map></ark-map>
    `
    const map = container.querySelector('ark-map')

    expect(map.select('.leaflet-marker-icon')).toBeFalsy()

    map.addMarker(2.43, -76.61)

    expect(map.select('.leaflet-marker-icon')).toBeTruthy()
  })
})
