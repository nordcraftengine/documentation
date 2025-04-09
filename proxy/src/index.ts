import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { createSearchIndex, fetchContent, search } from './routes'
import type { Env, MenuItem } from './types'
import { errorResponse, getFilePathWithLocal } from './utils'
import { loadJsonFile } from './utils/jsonLoader'

const app = new Hono<{ Bindings: Env }>()

app.use(secureHeaders())
app.use(
  cors({
    origin: (o) =>
      o.endsWith('localhost:9000') ||
      o.endsWith('toddledocs2.toddle.site') ||
      o.endsWith('docs.nordcraft.com')
        ? o
        : undefined,
  }),
)

// URLs like: http://localhost:9000/content/toddledev/documentation/main/the-editor/canvas
app.get(`content/:owner/:repository/:branch/:path{.*}?`, async (ctx) => {
  const owner = ctx.req.param('owner')
  const repository = ctx.req.param('repository')
  const branch = ctx.req.param('branch')
  const path = ctx.req.param('path')

  return fetchContent({
    params: { owner, repository, branch, path },
    ctx,
  })
})

app.get(`contributors/:path{.*}?`, async (ctx) => {
  const path = ctx.req.param('path')
  const menuItems = await loadJsonFile<MenuItem[]>('./menuItems.json')
  if (!menuItems) {
    return errorResponse('Could not fetch menu items.', { status: 500 })
  }
  const file = getFilePathWithLocal({ path, menuItems })
  const jsonFile = await loadJsonFile<{
    contributors: Array<{ avatar: string; username: string }>
    lastEditedAt: string
  }>(file.contributorsPath)
  if (jsonFile) {
    return ctx.json(jsonFile, {
      headers: {
        'Cache-Control': `public, max-age=${5 * 60}`,
      },
    })
  }
  return errorResponse('Not found', { status: 404 })
})

app.post('create-search-index', async (ctx) => {
  const isAuthenticated =
    ctx.req.header('Authorization') === ctx.env.SEARCH_INDEX_AUTH_TOKEN

  if (!isAuthenticated) {
    return errorResponse('Not authorized', { status: 401 })
  }

  return createSearchIndex({
    params: { owner: 'spark-agency', repository: 'documentation' },
    ctx,
  })
})

app.post('search', async (ctx) => {
  const data = (await ctx.req.json()) as { searchTerm?: string }

  return search({ params: { searchTerm: data.searchTerm ?? '' }, ctx })
})

export default app
