import '../../../src/components/navbar'

describe('Nav', () => {
  it('can be instantiated', () => {
    const item = document.createElement('ark-nav')
    expect(item).toBeTruthy()
  })

  it('can be rendered with content', function () {
    const item = document.createElement('ark-nav')
    item.innerHTML = /* HTML */`
      <span>mySpan</span>
    `
    item.connectedCallback()
    const itemElement = item.querySelector('span')
    expect(itemElement.textContent).toEqual('mySpan')
  })
})
