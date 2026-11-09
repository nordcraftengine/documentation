import { afterEach, describe, expect, spyOn, test } from 'bun:test'
import type { Context } from 'hono'
import type { Env } from '../types'
import { fetchContent } from './fetchContent'

describe('fetchContent', () => {
  let fetchSpy: ReturnType<typeof spyOn> | undefined

  afterEach(() => {
    fetchSpy?.mockRestore()
  })

  test('should return page content with Cache-Control header when fetched from remote', async () => {
    const mockRepoItems = [
      {
        path: 'test',
        label: 'Test Item',
      },
    ]

    const mockMarkdown = `---
title: Remote Test
description: Remote Description
---

# Remote Content
This is remote content.`

    const mockFetch = Object.assign(
      async (input: RequestInfo | URL) => {
        const url = typeof input === 'string' ? input : input.toString()
        if (url.endsWith('docs/index.json')) {
          return new Response(JSON.stringify(mockRepoItems), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        }
        return new Response(mockMarkdown, {
          status: 200,
          headers: { 'Content-Type': 'text/plain' },
        })
      },
      { preconnect: () => {} },
    )

    fetchSpy = spyOn(globalThis, 'fetch').mockImplementation(mockFetch)

    const response = await fetchContent({
      params: {
        owner: 'other',
        repository: 'repo',
        branch: 'feat',
        path: 'test-item',
      },
      ctx: {} as Context<{ Bindings: Env }>,
    })

    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=600')
    const body = (await response.json()) as {
      seo: { title?: string }
      meta: { title?: string }
    }
    expect(body.seo.title).toBe('Remote Test')
    expect(body.meta.title).toBe('Test Item')
  })

  test('should return 500 when remote fetch fails', async () => {
    const consoleSpy = spyOn(console, 'log').mockImplementation(() => {})

    fetchSpy = spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('Not Found', { status: 404 }),
    )

    const response = await fetchContent({
      params: {
        owner: 'other',
        repository: 'repo',
        branch: 'feat',
        path: 'test',
      },
      ctx: {} as Context<{ Bindings: Env }>,
    })

    expect(response.status).toBe(500)
    consoleSpy.mockRestore()
  })
})
