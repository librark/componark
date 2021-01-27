import { Icon } from 'components/icon'

describe('Icon', () => {
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
    <ark-icon></ark-icon>
    `
    const icon = container.querySelector('ark-icon')

    expect(icon).toBeTruthy()

    expect(icon).toBe(icon.init())
  })

  it('renders fontawesome icons by default', function () {
    container.innerHTML = `
    <ark-icon name="fab fa-android"></ark-icon>
    `
    const icon = container.querySelector('ark-icon')

    expect(icon.select('i')).toBeTruthy()
    expect(icon.select('i').textContent).toEqual('')
    expect(icon.select('i').className).toEqual('fab fa-android')
  })

  it('can render material icons', function () {
    container.innerHTML = `
    <ark-icon type="mat" name="done"></ark-icon>
    `
    const icon = container.querySelector('ark-icon')

    expect(icon.select('i')).toBeTruthy()
    expect(icon.select('i').textContent).toEqual('done')
    expect(icon.select('i').className).toEqual('material-icons')
  })
})
