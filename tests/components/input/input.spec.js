import '../../../src/components/input'

describe('Input', () => {
  it('can be instantiated', () => {
    const item = document.createElement('ark-input')
    expect(item).toBeTruthy()

    var init = item.init()
    expect(item === init).toBeTruthy()
  })
  it('can be rendered without content', () => {
    const item = document.createElement('ark-input')
    item.innerHTML = /* html */``
    item.connectedCallback()
  })
  it('can be rendered without content', () => {
    const item = document.createElement('ark-input')
    item.innerHTML = /* html */`
      <label slot="label">label</label>
      <label slot="alert">alert label 1</label>
      <label slot="alert">alert label 2</label>
    `
    item.connectedCallback()

    const labels = item.querySelector('.ark-input__label small')
    expect(labels.childElementCount === 1).toBeTruthy()

    const alerts = item.querySelector('.ark-input__alert')
    expect(alerts.childElementCount === 2).toBeTruthy()
  })

  it('can be rendered with type', function () {
    const item = document.createElement('ark-input')
    const att = document.createAttribute('type')
    att.value = 'date'
    item.setAttributeNode(att)

    item.connectedCallback()

    expect(item.querySelector('.ark-input__type-date') !== null).toBeTruthy()
  })

  it('can be rendered with required', function () {
    const item = document.createElement('ark-input')
    const att = document.createAttribute('required')
    item.setAttributeNode(att)

    item.connectedCallback()

    expect(item.querySelector('.ark-input__type-text') !== null).toBeTruthy()
  })
})
