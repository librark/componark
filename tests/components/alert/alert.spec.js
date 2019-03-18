import '../../../src/components/alert'

describe('Alert', () => {
  it('can be instantiated', () => {
    const alert = document.createElement('ark-alert')
    expect(alert).toBeTruthy()
  })

  it('can be rendered with slots', function () {
    const alert = document.createElement('ark-alert')
    alert.innerHTML = /* HTML */`
      <div slot="action">Menu</div>
    `
    alert.connectedCallback()

    const content = alert.querySelector('.ark-alert__actions')
    expect(content.childElementCount).toBeTruthy()
  })

  it('can be hidden', function () {
    const alert = document.createElement('ark-alert')
    alert.connectedCallback()

    const btn = alert.querySelector('[close]')
    btn.click()

    const atts = Array.from(alert.attributes).filter(a => a.name === 'hidden')
    expect(atts.length).toBeTruthy()
  })

  it('can be hidden by close method', function () {
    const alert = document.createElement('ark-alert')
    alert.connectedCallback()
    alert.close()

    const atts = Array.from(alert.attributes).filter(a => a.name === 'hidden')
    expect(atts.length).toBeTruthy()
  })

  it('can be oppend by open method', function () {
    const alert = document.createElement('ark-alert')
    alert.connectedCallback()

    alert.close()
    expect(Array.from(alert.attributes).filter(
      a => a.name === 'hidden').length).toBeTruthy()

    alert.open()
    expect(!Array.from(alert.attributes).filter(
      a => a.name === 'hidden').length).toBeTruthy()
  })

  it('can be hidden by toggle method', function () {
    const alert = document.createElement('ark-alert')
    alert.connectedCallback()

    alert.open()
    expect(!Array.from(alert.attributes).filter(
      a => a.name === 'hidden').length).toBeTruthy()

    alert.toggle()
    expect(Array.from(alert.attributes).filter(
      a => a.name === 'hidden').length).toBeTruthy()

    alert.toggle()
    expect(!Array.from(alert.attributes).filter(
      a => a.name === 'hidden').length).toBeTruthy()
  })
})
