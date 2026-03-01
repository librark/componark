import { it } from 'node:test';
import assert from 'node:assert/strict';
import { uuid } from './uuid.js'

it('groups separated by dashes', () => {
  const id = uuid()
  assert.ok(id.split('-').length === 5)
})

it('total digits == 32', () => {
  const id = uuid()

  let digits = ''
  id.split('-').forEach(element => {
    digits += element
  })

  assert.ok(digits.length === 32)
})
