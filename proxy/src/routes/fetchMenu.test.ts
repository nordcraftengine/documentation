import { afterEach, describe, expect, spyOn, test } from 'bun:test'
import type { Context } from 'hono'
import type { Env } from '../types'
import * as jsonLoader from '../utils/jsonLoader'
import { fetchMenu } from './fetchMenu'

describe('fetchMenu', () => {
  let fetchSpy: ReturnType<typeof spyOn> | undefined
  let jsonLoaderSpy: ReturnType<typeof spyOn> | undefined

  afterEach(() => {
    fetchSpy?.mockRestore()
    jsonLoaderSpy?.mockRestore()
  })

  test('should return menu with CDN-Cache-Control header when fetched locally', async () => {
    jsonLoaderSpy = spyOn(jsonLoader, 'loadJsonFile').mockResolvedValue([
      {
        id: 'test-item',
        name: 'Test Item',
        path: '01-test/index.md',
        localPath: './docs/01-test/index.md',
        contributorsPath: './contributors/01-test/index.json',
        type: 'file',
      },
    ])

    const response = await fetchMenu({
      params: {
        owner: 'nordcraftengine',
        repository: 'documentation',
        branch: 'main',
      },
      ctx: {} as Context<{ Bindings: Env }>,
    })

    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=600')
    expect(response.headers.get('CDN-Cache-Control')).toBe(
      'public, max-age=86400',
    )
    const body = (await response.json()) as { menu: unknown[] }
    expect(body.menu).toBeDefined()
    expect(body.menu.length).toBe(1)
  })

  test('should return menu with Cache-Control header when fetched from remote', async () => {
    const mockRepoItems = [
      {
        path: 'test',
        label: 'Test Item',
      },
    ]

    fetchSpy = spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(mockRepoItems), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    const response = await fetchMenu({
      params: { owner: 'other', repository: 'repo', branch: 'feat' },
      ctx: {} as Context<{ Bindings: Env }>,
    })

    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=600')
    expect(response.headers.get('CDN-Cache-Control')).toBeNull()
    const body = (await response.json()) as { menu: unknown[] }
    expect(body.menu).toBeDefined()
    expect(body.menu.length).toBe(1)
  })

  test('should return 500 when fetch fails', async () => {
    const consoleSpy = spyOn(console, 'log').mockImplementation(() => {})

    fetchSpy = spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('Not Found', { status: 404 }),
    )

    const response = await fetchMenu({
      params: { owner: 'other', repository: 'repo', branch: 'feat' },
      ctx: {} as Context<{ Bindings: Env }>,
    })

    expect(response.status).toBe(500)
    consoleSpy.mockRestore()
  })
})
