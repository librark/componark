import { AccordionTab } from '../../../src/components/accordion'

describe('Accordion Tab', () => {
  let container = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it('can be instantiated', ()=> {
    container.innerHTML = /* html */ `
      <ark-accordion>
        <ark-accordion-tab>
        </ark-accordion-tab>
      </ark-accordion>
    `
    
    const tab = container.querySelector('ark-accordion-tab') 
    expect(tab).toBeTruthy()
    expect(tab).toBe(tab.init())
  })

  it('can open content', () => {
    container.innerHTML = /* html */ `
      <ark-accordion>
        <ark-accordion-tab>
          <p>
            Lorem, ipsum dolor sit amet 
            consectetur adipisicing elit. Totam nihil, 
            similique vel accusamus quo adipisci repellendus 
            velit quisquam laborum doloribus alias accusantium
            est et porro ex molestias? Iure, eveniet odit.
          </p>
        </ark-accordion-tab>
      </ark-accordion>
    `
    const tab = container.querySelector('ark-accordion-tab') 
    tab.setAttribute('header', 'my header')
    tab.connectedCallback()

    const header = tab.querySelector('[data-accordion-tab-header]')
    expect(header.innerHTML.trim()).toBe('my header')

    tab.open()
    expect(tab.hasAttribute('active')).toBeTruthy()

    tab.close()
    expect(!tab.hasAttribute('active')).toBeTruthy()

    const eventClick = new Event('click')

    tab.toggle()
    expect(tab.hasAttribute('active')).toBeTruthy()

    tab.toggle()
    expect(!tab.hasAttribute('active')).toBeTruthy()
  })

  it('can render tab with empty header', () => {
    container.innerHTML = /* html */ `
      <ark-accordion>
        <ark-accordion-tab header=''>
          <p>
            Lorem, ipsum dolor sit amet 
            consectetur adipisicing elit. Totam nihil, 
            similique vel accusamus quo adipisci repellendus 
            velit quisquam laborum doloribus alias accusantium
            est et porro ex molestias? Iure, eveniet odit.
          </p>
        </ark-accordion-tab>
      </ark-accordion>
    `
    const tabHeader = container.querySelector('[data-accordion-tab-header]')
    
    expect(tabHeader.innerHTML.trim()).toBe('')
  })
  
  it('can render tab with header and icon', () => {
    container.innerHTML = /* html */ `
    <ark-accordion>
      <ark-accordion-tab header='Tab Icon'>
        <ark-icon slot='icon'></ark-icon>
          <p>
            Lorem, ipsum dolor sit amet 
            consectetur adipisicing elit. Totam nihil, 
            similique vel accusamus quo adipisci repellendus 
            velit quisquam laborum doloribus alias accusantium
            est et porro ex molestias? Iure, eveniet odit.
          </p>
      </ark-accordion-tab>
    </ark-accordion>
    `
    
    const tabHeader = container.querySelector('[data-accordion-tab-header]')
    expect(tabHeader.querySelector('ark-icon')).toBeTruthy()
  })
})
