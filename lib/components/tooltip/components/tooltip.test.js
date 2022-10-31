import { Tooltip } from './tooltip.js'

describe('tooltip', () => {
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
    container.innerHTML = /* html */ `
      <ark-tooltip></ark-tooltip>
    `

    const tooltip = container.querySelector('ark-tooltip')

    expect(tooltip).toBe(tooltip.init())
  })

  it('can be instantiated with content', () => {
    container.innerHTML = /* html */ `
      <ark-tooltip position="" text="my text">
         <span>hello</span>
      </ark-tooltip>
    `

    const tooltip = container.querySelector('ark-tooltip')

    expect(
      tooltip.querySelector('.ark-tooltip__content').innerHTML.trim()
    ).toEqual('<span>hello</span>')

    expect(
      tooltip.querySelector('.ark-tooltip__text').innerHTML.trim()
    ).toEqual('my text')
  })

  it('the position can be changed', () => {
    container.innerHTML = /* html */ `
      <ark-tooltip>
         <span>hello</span>
      </ark-tooltip>
    `

    const tooltip = container.querySelector('ark-tooltip')
    
    tooltip.position = 'top'
    tooltip.render()
    expect(tooltip.position).toBe('top')
    
    tooltip.position = 'right'
    tooltip.render()
    expect(tooltip.position).toBe('right')
    
    tooltip.position = 'bottom'
    tooltip.render()
    expect(tooltip.position).toBe('bottom')
    
    tooltip.position = 'left'
    tooltip.render()
    expect(tooltip.position).toBe('left')
  })

})
