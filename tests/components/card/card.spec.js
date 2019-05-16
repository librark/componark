import '../../../src/components/card'

describe('Card', () => {
  it('can be instantiated', () => {
    const element = document.createElement('ark-card')
    expect(element).toBeTruthy()

    var init = element.init()
    expect(element === init).toBeTruthy()
  })

  it('can be rendered without content', function () {
    const element = document.createElement('ark-card')
    element.connectedCallback()

    // const elementElement = element.querySelector('card')
    // expect(elementElement).toBeTruthy()
  })
})
