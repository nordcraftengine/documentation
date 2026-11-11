import type { Context } from 'hono'

export const handleThumbnail = async (ctx: Context) => {
  const videoId = ctx.req.param('videoId')
  const url = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const response = await fetch(url)
  if (!response.ok) {
    return new Response(null, {
      status: 404,
      headers: {
        'Content-Type': 'image/jpeg',
      },
    })
  }
  const contentType = response.headers.get('Content-Type')
  const contentLength = response.headers.get('Content-Length')
  const headers = new Headers()
  headers.set('Content-Type', contentType ?? 'image/jpeg')
  headers.set('Content-Length', contentLength ?? '0')
  headers.set('Cache-Control', 'public, max-age=3600')
  headers.set('CDN-Cache-Control', `public, max-age=${24 * 60 * 60}`)
  return new Response(response.body, {
    status: response.status,
    headers,
  })
}
