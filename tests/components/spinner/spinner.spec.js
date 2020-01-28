import { Spinner } from '../../../src/components/spinner'

describe('Spinner', () => {
  it('can be instantiated', () => {
    const spinner = new Spinner()

    spinner.init()
    spinner.render()
    spinner.load()

    expect(spinner.querySelector('[data-loader]')).toBeTruthy()
  })

  it('can be instantiated', () => {
    const spinner = new Spinner()

    spinner.init()

    spinner.size = ''
    spinner.border = ''

    spinner.render()
    spinner.load()

    expect(!spinner.size.trim().length).toBeTruthy()
  })
})


