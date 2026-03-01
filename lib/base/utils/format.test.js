import { it } from 'node:test';
import assert from 'node:assert/strict';
import { camelToKebab, kebabToCamel, snakeToCamel } from './format.js'

it('can convert camel to kebab', () => {
  const camel = 'myVariable'
  const kebab = camelToKebab(camel)
  assert.strictEqual(kebab, 'my-variable')
})
it('can convert kebab to camel', () => {
  const kebab = 'my-variable'
  const camel = kebabToCamel(kebab)
  assert.strictEqual(camel, 'myVariable')
})
it('can convert snake to camel', () => {
  const kebab = 'my_variable'
  const camel = snakeToCamel(kebab)
  assert.strictEqual(camel, 'myVariable')
})
