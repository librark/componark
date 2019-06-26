import { camelToKebab, kebabToCamel } from '../../../src/utils'

describe('Format', () => {
  it('can convert camel to kebab', () => {
    const camel = 'myVariable'
    const kebab = camelToKebab(camel)
    expect(kebab).toBe('my-variable')
  })
  it('can convert kebab to camel', () => {
    const kebab = 'my-variable'
    const camel = kebabToCamel(kebab)
    expect(camel).toBe('myVariable')
  })
})
