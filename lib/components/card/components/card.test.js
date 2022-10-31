import './card.js'

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
    <ark-card></ark-card>
    `
    const card = container.querySelector('ark-card')
    expect(card).toBeTruthy()

    expect(card).toBe(card.init())
  })

  it('can have a title and/or a subtitle', () => {
    container.innerHTML = `
    <ark-card title="Random Title"></ark-card>
    `
    let card = container.querySelector('ark-card')
    expect(card.select(
      '.ark-card__title').textContent).toEqual('Random Title')

    container.innerHTML = `
    <ark-card data-card1 subtitle="Random Subtitle"></ark-card>
    `
    card = container.querySelector('ark-card')
    expect(card.select(
      '.ark-card__subtitle').textContent).toEqual('Random Subtitle')
  })

  it('can be rendered with slotted content', () => {
    container.innerHTML = /* html */ `
      <ark-card title="Custom Title" subtitle="Custom Subtitle">
        <img slot="media"/>
        <div>my custom body</div>
        <div slot="actions">
          <button>Accept</button>
        </div>
      </ark-card>
    `

    const card = /** @type {Card} */ (container.querySelector('ark-card'))

    const media = card.select('.ark-card__media')
    expect(media.firstElementChild.tagName).toEqual('IMG')

    const body = card.select('.ark-card__body')
    expect(body.firstElementChild.textContent).toEqual('my custom body')

    const header = card.select('.ark-card__header')
    const title = header.querySelector('.ark-card__title')
    const subtitle = header.querySelector('.ark-card__subtitle')
    expect(title.textContent).toEqual('Custom Title')
    expect(subtitle.textContent).toEqual('Custom Subtitle')

    const actions = card.select('.ark-card__actions')
    expect(actions.firstElementChild.querySelector('button')).toBeTruthy()
  })

  it('can render all its general slots in its body', () => {
    container.innerHTML = /* html */ `
      <ark-card>
        <div>body first</div>
        <div>body second</div>
      </ark-card>
    `

    const card = /** @type {Card} */ (container.querySelector('ark-card'))

    const body = card.select('.ark-card__body')
    expect(body.firstElementChild.textContent).toEqual('body first')
    expect(body.lastElementChild.textContent).toEqual('body second')
  })
})
