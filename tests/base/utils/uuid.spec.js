import { uuid } from 'base/utils'

describe('Slots', () => {
  it('groups separated by dashes', () => {
    const id = uuid()
    expect(id.split('-').length === 5).toBeTruthy()
  })

  it('total digits == 32', () => {
    const id = uuid()

    let digits = ''
    id.split('-').forEach(element => {
      digits += element
    })

    expect(digits.length === 32).toBeTruthy()
  })
})
