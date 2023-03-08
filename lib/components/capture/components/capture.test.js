import './capture.js'

describe('Capture', () => {
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
    container.innerHTML = `
    <ark-capture></ark-capture>
    `

    const capture = container.querySelector('ark-capture')
    expect(capture).toEqual(capture.init())
  })

  it('renders json data on the given template on the given output', () => {
    container.innerHTML = `
    <ark-capture>
      <data>
        {
          "name": "John Doe",
          "job": "Programmer"
        }
      </data>
      <template>
        <div id="output">
          <strong>\${this.name}</strong>
          <strong>\${this.job}</strong>
        </div>
      </template>
    </ark-capture>
    `

    const capture = container.querySelector('ark-capture')

    expect(capture.children.length).toEqual(1)
    expect(capture.children[0].innerHTML).toContain('John Doe')
    expect(capture.children[0].innerHTML).toContain('Programmer')
  })

  it('captures specific custom events and renders its details', () => {
    container.innerHTML = `
    <ark-capture receive="custom">
      <template>
        <div id="output">
          <strong>\${this.name}</strong>
          <strong>\${this.job}</strong>
        </div>
      </template>
    </ark-capture>
    `

    const capture = container.querySelector('ark-capture')

    capture.dispatchEvent(new CustomEvent('custom', {
      bubbles: true,
      detail: {
        name: 'Richard Roe', job: 'Analyst'
      }
    }))

    expect(capture.children.length).toEqual(1)
    expect(capture.children[0].innerHTML).toContain('Richard Roe')
    expect(capture.children[0].innerHTML).toContain('Analyst')

    capture.dispatchEvent(new CustomEvent('custom', {
      bubbles: true,
      detail: {
        name: 'Megan More', job: 'Manager'
      }
    }))

    expect(capture.children.length).toEqual(1)
    expect(capture.children[0].innerHTML).toContain('Megan More')
    expect(capture.children[0].innerHTML).toContain('Manager')
  })
})
