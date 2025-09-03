import { execSync } from 'child_process'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import type { MenuItemsStructure } from '../src/types'
import { getStructure } from './fileTree'

const getCommitDates = (path: string) =>
  execSync(`git log -1 --pretty="format:%ci" .${path}`).toString().trim()

const sitemapItems: Array<{ url: string; lastModified?: Date }> = []
const addItems = (items: MenuItemsStructure) =>
  items.forEach((item) => {
    if ((item.children?.length ?? 0) > 0) {
      item.children?.forEach((child) => {
        const childPath = `${item.path}/${child.path}`
        const lastModified = getCommitDates(`./docs/${childPath}/index.md`)

        sitemapItems.push({
          url: childPath,
          lastModified: lastModified ? new Date(lastModified) : undefined,
        })
      })
    } else {
      const lastModified = getCommitDates(`./docs/${item.path}/index.md`)

      sitemapItems.push({
        url: item.path,
        lastModified: lastModified ? new Date(lastModified) : undefined,
      })
    }
  })

addItems(getStructure())

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
