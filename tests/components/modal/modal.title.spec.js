import '../../../src/components/modal'

describe('Modal title', () => {
  it('can be instantiated', () => {
    const modal = document.createElement('ark-modal-title')
    expect(modal).toBeTruthy()
  })

  it('can be rendered without content', function () {
    const modal = document.createElement('ark-modal-title')
    modal.connectedCallback()
    const modalElement = modal.querySelector('h3')
    expect(modalElement).toBeTruthy()
  })
})
