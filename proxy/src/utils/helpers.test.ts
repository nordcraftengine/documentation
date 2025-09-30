import { describe, expect, test } from 'bun:test'
import { chunk, kebabCase } from './helpers'

describe('kebabCase', () => {
  test('should convert a string to kebab case', () => {
    expect(kebabCase('Hello World')).toBe('hello-world')
    expect(kebabCase('foo_bar')).toBe('foo-bar')
    expect(kebabCase('')).toBe('')
    expect(kebabCase('base64')).toBe('base64')
    expect(kebabCase('hello world _/# with special:chars')).toBe(
      'hello-world-with-special-chars',
    )
  })
})

describe('chunk', () => {
  test('should chunk an array into smaller arrays of a specified size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
    expect(chunk([], 2)).toEqual([])
  })
})
