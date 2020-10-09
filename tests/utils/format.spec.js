import { camelToKebab, kebabToCamel, snakeToCamel } from '../../src/utils'

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
  it('can convert snake to camel', () => {
    const kebab = 'my_variable'
    const camel = snakeToCamel(kebab)
    expect(camel).toBe('myVariable')
  })
})
