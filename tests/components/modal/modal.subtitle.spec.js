import '../../../src/components/modal'

describe('Modal Subtitle', () => {
  it('can be instantiated', () => {
    const modal = document.createElement('ark-modal-subtitle')
    expect(modal).toBeTruthy()
  })

  it('can be rendered without content', function () {
    const modal = document.createElement('ark-modal-subtitle')
    modal.connectedCallback()
    const modalElement = modal.querySelector('p')
    expect(modalElement).toBeTruthy()
  })
})
