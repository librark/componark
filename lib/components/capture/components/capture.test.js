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
})
