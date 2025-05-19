import { expect, it, test } from 'bun:test'
import { getFrontMatter } from './frontMatter'

test('getFrontMatter', () => {
  it('should extract front matter and body from text', () => {
    const { attributes, body } = getFrontMatter(`
  ---
  title: Test title
  description: Test: description
  ---

  # The body

  The body
      `)
    expect(attributes).toEqual({
      title: 'Test title',
      description: 'Test: description',
    })
    expect(body).toBe('# The body\n\nThe body')
  })
  it('should support no front matter', () => {
    const { attributes, body } = getFrontMatter(`
  # The body

  The body
      `)
    expect(attributes).toEqual({})
    expect(body).toBe('# The body\n\nThe body')
  })
  it('should support an empty string', () => {
    const { attributes, body } = getFrontMatter(``)
    expect(attributes).toEqual({})
    expect(body).toBe('')
  })
})
