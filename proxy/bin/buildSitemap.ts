import { execSync } from 'child_process'
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs'
import type { MenuItem } from '../src/types'
import { getMenuItemsFromRepoItems } from '../src/utils'

const getCommitDates = (path: string) =>
  execSync(`git log -1 --pretty="format:%ci" .${path}`).toString().trim()

// Read all files
const files = (
  readdirSync('./dist/docs', { recursive: true }) as string[]
).sort((a, b) => {
  const aParts = a.split('/')
  const bParts = b.split('/')

  if (aParts.length === bParts.length) {
    return a.localeCompare(b)
  }
  return aParts.length - bParts.length
})
// Create menu items structure
const menuItems = getMenuItemsFromRepoItems({
  items: files.map((file) => ({
    path: `docs/${file as string}`,
    type: 'tree',
  })),
  parentPath: 'docs',
  owner: 'nordcraftengine',
  repository: 'documentation',
  branch: 'main',
})

const sitemapItems: Array<{ url: string; lastModified?: Date }> = []
const addItems = (items: MenuItem[], parts: string[]) =>
  items.forEach((item) => {
    if (item.type === 'folder') {
      addItems(item.children, [...parts, item.id])
    } else {
      const lastModified = getCommitDates(item.localPath)

      // We use the docs.nordcraft.com/ as the canonical URL for '/about'
      // So the sitemap should also reflect that
      const itemId = item.id === 'about' ? '' : item.id

      sitemapItems.push({
        url: [...parts, itemId].join('/'),
        lastModified: lastModified ? new Date(lastModified) : undefined,
      })
    }
  })

addItems(menuItems, [])

const content = `\
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapItems
    .map((item, i) => {
      return `<url>
    <loc>https://docs.nordcraft.com/${item.url}</loc>
    ${item.lastModified ? `<lastmod>${item.lastModified.toISOString()}</lastmod>` : ''}
    <priority>${(1 - i / sitemapItems.length).toFixed(3)}</priority>
  </url>`
    })
    .join('\n  ')}
</urlset>
`
if (!existsSync('./static')) {
  mkdirSync('./static')
}
writeFileSync('./static/sitemap.xml', content, 'utf-8')
