import { Tooltip } from '../../../src/components/tooltip'

describe('tooltip', () => {
  it('can be instantiated', () => {
    const tooltip = new Tooltip()
    const content = 'hello'
    const text = 'my text'

    tooltip.innerHTML = content

    tooltip.init({
      position: '',
      text: text
    })
    tooltip.render()
    tooltip.load()

    expect(
      tooltip.querySelector('.ark-tooltip__content').innerHTML.trim()
    ).toEqual(content)

    expect(
      tooltip.querySelector('.ark-tooltip__text').innerHTML.trim()
    ).toEqual(text)
  })

  it('can be instantiated', () => {
    const tooltip = new Tooltip()

    tooltip.init()
    tooltip.render()
    tooltip.load()
  })
})
