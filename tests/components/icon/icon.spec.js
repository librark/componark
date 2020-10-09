import { Icon } from '../../../src/components/icon'

describe('Icon', () => {
  it('can be instantiated', () => {
    const icon = new Icon()
    expect(icon).toBeTruthy()
  })

  it('can be instantiated', () => {
    const icon = new Icon()
    expect(icon).toBeTruthy()
    const init = icon.init()
    expect(icon === init).toBeTruthy()
  })

  it('can be rendered with default variables', function () {
    const icon = new Icon()
    icon.connectedCallback()
    const iconElement = icon.querySelector('i')
    expect(iconElement).toBeTruthy()
  })

  it('can be rendered with undefined variables', function () {
    const icon = new Icon()
    icon.setAttribute('type', 'mat')
    icon.init().render().load()
    icon.render()

    expect(icon.querySelector('.material-icons')).toBeTruthy()
  })
})
