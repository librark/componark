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
    expect(!element.innerHTML.trim().length).toBeTruthy()
  })

  it('can be rendered with content', function () {
    const element = document.createElement('ark-card')
    element.innerHTML = /* html */`
      <img src="" slot="media"/>
      <span slot="title">title</span>
      <span slot="subtitle">subtitle</span>
    `
    element.connectedCallback()

    expect(element.querySelector(
      'div.ark-card__media [slot="media"]'
    )).toBeTruthy()

    expect(element.querySelector(
      'div.ark-card__header h3.ark-card__title [slot="title"]'
    )).toBeTruthy()

    expect(element.querySelector(
      'div.ark-card__header span.ark-card__subtitle [slot="subtitle"]'
    )).toBeTruthy()
  })
})
