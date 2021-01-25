import { Card } from 'components/card'

describe('Card', () => {
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
      <ark-card><ark-card>
    `
    const card = container.querySelector('ark-card')
    expect(card).toBeTruthy()

    expect(card).toBe(card.init())
  })

  it('can be rendered with slotted content', function () {
    container.innerHTML = /* html */ `
      <ark-card title="Title" subtitle="Subtitle">
        <img slot="media"/>
        <div>body</div>
        <div slot="actions">action</div>
      </ark-card>
    `

    const card = container.querySelector('ark-card')
    //card.init().render().load()
    //
    console.log('Card Slots>>>', card.outerHTML)

    // @ts-ignore
    expect(card.slots.general.length).toBeTruthy()
    // @ts-ignore
    expect(card.slots.media.length).toBeTruthy()
    // @ts-ignore
    expect(card.slots.actions.length).toBeTruthy()
  })

  xit('can be rendered with class elements content', function () {
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
