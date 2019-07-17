/**
 * @typedef {import('../../../src/components').Splitview} Splitview
 **/
import { Splitview } from '../../../src/components/splitview'

describe('Splitview', () => {
  it('can be instantiated', () => {
    const splitview = new Splitview()
    splitview.init({})
    splitview.connectedCallback()

    expect(splitview.outerHTML.trim()).toBe(
      '<ark-splitview detail-percentage=""></ark-splitview>'
    )
  })

  it('can be instantiated with elements', () => {
    const detailTemplate = (item) => {
      return /* html */`
        <span data-detail>${item}</span>
      `
    }

    const splitview = new Splitview()

    splitview.innerHTML = /* html */`
      <ark-splitview-master>
      <p data-info-splitview-master>ok</p>
      </ark-splitview-master>
    `
    splitview.init({
      detailTemplate: detailTemplate
    }).render()

    expect(splitview.master.querySelector(
      '[data-info-splitview-master]'
    ).textContent === 'ok').toBeTruthy()

    expect(splitview.detail.outerHTML.trim().length).toBeTruthy()
  })

  it('can change detail status', () => {
    const detailTemplate = (item) => {
      return /* html */`
        <span data-detail>${item}</span>
      `
    }

    const splitview = new Splitview()

    splitview.innerHTML = /* html */`
      <ark-splitview-master>
      <p data-info-splitview-master>ok</p>
      </ark-splitview-master>
    `
    splitview.init({
      detailTemplate: detailTemplate
    }).render()

    let event = new CustomEvent('click')
    // @ts-ignore
    splitview._onMasterChange(event)
    expect(!splitview.detail.querySelector('[data-detail]')).toBeTruthy()

    event = new CustomEvent('click', { detail: { item: 'ok' } })
    // @ts-ignore
    splitview._onMasterChange(event)
    expect(
      splitview.detail.querySelector('[data-detail]').textContent === 'ok'
    ).toBeTruthy()
  })
})
