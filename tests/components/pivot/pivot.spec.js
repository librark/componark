import { Pivot } from '../../../src/components/pivot'

describe('pivot', () => {
  it('can be instantiated', () => {
    const pivot = new Pivot()
    pivot.init().render().load()


    // const divContent = document.createElement('div')
    // divContent.appendChild(pivot)
    // pivot.init({ data: {} }).render().load()

    console.log(pivot.innerHTML)
  })
})
