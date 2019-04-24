import '../../../src/components/tabs'

describe('Sidebar', () => {
  it('can be instantiated', () => {
    const item = document.createElement('ark-tabs')
    expect(item).toBeTruthy()

    var init = item.init()
    expect(item === init).toBeTruthy()
  })

  it('can be rendered without active attribute', function () {
    const item = document.createElement('ark-tabs')
    item.innerHTML = /* HTML */`
      <ark-tabs-item id="t-1">
        <ark-icon name="far fa-address-book"></ark-icon>
        <span>span-1</span>
      </ark-tabs-item>
      <ark-tabs-item id="t-2">
        <ark-icon name="far fa-address-book"></ark-icon>
        <span>span-2 asdf asdfs</span>
      </ark-tabs-item>
    `
    item.connectedCallback()

    const element = item.querySelector('[active]')
    expect(element.getAttribute('id') === 't-1').toBeTruthy()
  })

  it('can be rendered with active attribute', function () {
    const item = document.createElement('ark-tabs')
    item.innerHTML = /* HTML */`
      <ark-tabs-item id="t-1">
        <ark-icon name="far fa-address-book"></ark-icon>
        <span>span-1</span>
      </ark-tabs-item>
      <ark-tabs-item id="t-2" active>
        <ark-icon name="far fa-address-book"></ark-icon>
        <span>span-2 asdf asdfs</span>
      </ark-tabs-item>
    `
    item.connectedCallback()

    const element = item.querySelector('[active]')
    expect(element.getAttribute('id') === 't-2').toBeTruthy()
  })

  it('can be rendered replace active attribute', function () {
    const item = document.createElement('ark-tabs')
    item.innerHTML = /* HTML */`
      <ark-tabs-item id="t-1">
        <ark-icon name="far fa-address-book"></ark-icon>
        <span>span-1</span>
      </ark-tabs-item>
      <ark-tabs-item id="t-2" active>
        <ark-icon name="far fa-address-book"></ark-icon>
        <span>span-2 asdf asdfs</span>
      </ark-tabs-item>
    `
    item.connectedCallback()

    const element = item.querySelector('[id="t-1"]')
    element.click()

    const element2 = item.querySelector('[id="t-2"]')
    expect(!element2.getAttribute('active')).toBeTruthy()
  })
})
