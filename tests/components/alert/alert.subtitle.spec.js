import '../../../src/components/alert'

describe('Alert Subtitle', () => {
  it('can be instantiated', () => {
    const alert = document.createElement('ark-alert-subtitle')
    expect(alert).toBeTruthy()
  })

  it('can be rendered without content', function () {
    const alert = document.createElement('ark-alert-subtitle')
    alert.connectedCallback()
    const alertElement = alert.querySelector('p')
    expect(alertElement).toBeTruthy()
  })
})
