import '../../../src/components/alert'

describe('Alert title', () => {
  it('can be instantiated', () => {
    const alert = document.createElement('ark-alert-title')
    expect(alert).toBeTruthy()
  })

  it('can be rendered without content', function () {
    const alert = document.createElement('ark-alert-title')
    alert.connectedCallback()
    const alertElement = alert.querySelector('h3')
    expect(alertElement).toBeTruthy()
  })
})
