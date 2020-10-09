import { RadioButton, RadioGroup } from '../../../src/components/radio'

describe('RadioGroup', () => {
  it('can be instantiated', () => {
    const radio1 = new RadioButton()

    expect(radio1).toBeTruthy()

    radio1.connectedCallback()
    radio1.innerHTML = 'op1'
    radio1.init().render()

    const radio2 = new RadioButton()
    radio2.connectedCallback()
    radio2.innerHTML = 'op2'
    radio2.init().render()

    const radio3 = new RadioButton()
    radio3.connectedCallback()
    radio3.innerHTML = 'op3'
    radio3.init().render()

    const group = new RadioGroup()
    group.innerHTML = ''
    group.appendChild(radio1)
    group.appendChild(radio2)
    group.appendChild(radio3)
    group.init().render().load()

    radio1.click()
  })

  it('can be instantiated', () => {
    const element = new RadioGroup()
    expect(element).toBeTruthy()

    const init = element.init({})
    expect(element === init).toBeTruthy()
  })

  it('can be instantiated', () => {
    const element = new RadioGroup()
    element.setAttribute('label', 'my group')
    element.connectedCallback()

    const label = element.querySelector('[data-radio-group-label]')
    expect(label.textContent.trim()).toEqual('my group')
    expect(!element.value.trim().length).toBeTruthy()
  })

  it('returns selected values', () => {
    const group = new RadioGroup()

    const radio1 = new RadioButton()
    radio1.value = 'op1'
    radio1.init().render().load()

    const radio2 = new RadioButton()
    radio2.value = 'op2'
    radio2.init().render().load()

    // @ts-ignore
    group.defaultContent = null
    group.appendChild(radio1)
    group.appendChild(radio2)
    group.load()

    expect(!group.value.trim().length).toBeTruthy()
  })

  it('returns selected values Group', () => {
    const element = /** @type {HTMLElement} */(document.createElement('div'))
    element.innerHTML = /* html */`
      <ark-radio-group listen on-alter="radioGroup" label="Radios">
        <ark-radio-button value="op1">Opcion 1</ark-radio-button>
        <ark-radio-button value="op2" checked>Opcion 2</ark-radio-button>
        <ark-radio-button value="op3">Opcion 3</ark-radio-button>
      </ark-radio-group>
    `

    const radioGroup = /** @type {RadioGroup} */ (
      element.querySelector('ark-radio-group')
    )

    radioGroup.init().render().load()

    radioGroup.selectAll('ark-radio-button').forEach(radio => {
      radio.init().render().load()
    })

    const radio0 = /** @type {RadioButton} */ (
      radioGroup.selectAll('ark-radio-button')[0]
    )
    const radio1 = /** @type {RadioButton} */ (
      radioGroup.selectAll('ark-radio-button')[1]
    )
    const radio2 = /** @type {RadioButton} */ (
      radioGroup.selectAll('ark-radio-button')[2]
    )

    expect(radioGroup.value).toEqual('op2')

    radio1.click()
    expect(radioGroup.value).toEqual('op2')

    radio0.click()
    radio1.click()
    radio2.click()
    expect(radioGroup.value).toEqual('op3')

    radioGroup.click()
  })
})
