import { Card } from '../../../src/components/card'

describe('Card', () => {
  it('can be instantiated', () => {
    const element = new Card()
    expect(element).toBeTruthy()

    const init = element.init()
    expect(element === init).toBeTruthy()
  })

  it('can be rendered without content', function () {
    const element = new Card()
    element.connectedCallback()
    expect(!element.innerHTML.trim().length).toBeTruthy()
  })

  it('can be rendered with content', function () {
    const item = document.createElement('div')
    item.innerHTML = /* html */ `
      <ark-card title="Title" subtitle="Subtitle">
        <img slot="media"/>
        <div>body</div>
        <div slot="actions">action</div>
      </ark-card>
    `

    const card = /** @type {Card} */ (item.querySelector('ark-card'))
    card.init().render().load()

    // @ts-ignore
    expect(card.slots.general.length).toBeTruthy()
    // @ts-ignore
    expect(card.slots.media.length).toBeTruthy()
    // @ts-ignore
    expect(card.slots.actions.length).toBeTruthy()
  })

  it('can be rendered with content', function () {
    const item = document.createElement('div')
    item.innerHTML = /* html */ `
      <ark-card>
        <div class="ark-card__body">
          <div>body</div>
        </div>
        <div class="ark-card__media">
          <div>body</div>
        </div>
      </ark-card>
    `

    const card = /** @type {Card} */ (item.querySelector('ark-card'))
    card.init().render().load()

    expect(card.querySelectorAll('.ark-card__body').length).toEqual(1)
    expect(card.querySelectorAll('.ark-card__media').length).toEqual(0)
  })
})
