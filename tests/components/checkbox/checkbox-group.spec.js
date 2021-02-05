import { CheckboxGroup } from 'components/checkbox'

describe('Checkbox', () => {

  let container = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })


  it('can be instantiated', () => {

    container.innerHTML = /* html */ `
        <ark-checkbox-group></ark-checkbox-group>
    `

    const checkboxGroup = container.querySelector('ark-checkbox-group')
    expect(checkboxGroup).toBeTruthy()
    expect(checkboxGroup).toBe(checkboxGroup.init())
  })
  
  it('can be instantiated with label', () => {

    container.innerHTML = /* html */ `
        <ark-checkbox-group label="myCheckboxGroup"></ark-checkbox-group>
    `

    const checkboxGroup = container.querySelector('ark-checkbox-group')

    expect(
      checkboxGroup.querySelector('[data-checkbox-group-label]').textContent
    ).toEqual('myCheckboxGroup')
  })

  it('returns selected values', () => {
      container.innerHTML = /* html */ `
          <ark-checkbox-group>
            <ark-checkbox value="1" checked></ark-checkbox>
            <ark-checkbox value="2"></ark-checkbox>
            <ark-checkbox value="3"></ark-checkbox>
          </ark-checkbox-group>
    `

    
    const checkboxGroup = /** @type {CheckboxGroup} */(
      container.querySelector('ark-checkbox-group')
      )
    const items = container.querySelectorAll('ark-checkbox')

    expect(items[0].value).toEqual('1')
    expect(items[1].value).toEqual('2')
    expect(items[2].value).toEqual('3')
  })

  it('returns selected values Group', () => {
    container.innerHTML = /* html */ `
      <ark-checkbox-group listen on-alter="checkboxGroup" label="Checkboxs">
        <ark-checkbox value="op1">Opcion 1</ark-checkbox>
        <ark-checkbox value="op2" checked>Opcion 2</ark-checkbox>
        <ark-checkbox value="op3">Opcion 3</ark-checkbox>
      </ark-checkbox-group>
        
    `

    const checkboxGroup = /** @type {CheckboxGroup} */ (
      container.querySelector('ark-checkbox-group')
    )
    const items = checkboxGroup.querySelectorAll('ark-checkbox')

    const checkbox0 = items[0]
    const checkbox1 = items[1]
    const checkbox2 = items[2]
    

    expect(checkbox1.value).toEqual('op2')

    checkbox1.click()
    expect(!items.values.length).toBeTruthy()

    checkbox0.click()
    checkbox1.click()
    checkbox2.click()

   //checkboxGroup.value.split(',').length returns the number of checkbox selected
   //checkboxGroup.checkboxList[2].input.checked returns true if input is selected

    const label = /** @type {HTMLElement} */(
      checkboxGroup.querySelector('.ark-checkbox-group__label')
    )
    label.click()
  })
})
