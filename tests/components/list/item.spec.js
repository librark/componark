import '../../../src/components/list'

describe('Item', () => {
  it('can be instantiated', () => {
    const item = document.createElement('ark-item')
    expect(item).toBeTruthy()

    var init = item.init()
    expect(item === init).toBeTruthy()
  })

  it('can be rendered without content', function () {
    const item = document.createElement('ark-item')
    item.innerHTML = /* HTML */``
    item.connectedCallback()
    const itemElement = item.querySelector('.general')
    expect(!itemElement.children.length).toBeTruthy()
  })

  it('can be rendered with content', function () {
    const item = document.createElement('ark-item')
    item.innerHTML = /* HTML */`
      <span>mySpan</span>
      <div slot="start">start</div>
      <div slot="end">end</div>
    `
    item.connectedCallback()
    const itemElement = item.querySelector('.general span')
    expect(itemElement.textContent).toEqual('mySpan')
  })
})
