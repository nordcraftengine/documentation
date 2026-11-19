import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { MenuItemsStructure } from '../src/types'
import { parseRawContent } from '../src/utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const EXTERNAL_SCHEME_REGEX = /^(https?:|mailto:|tel:)/i

export interface LinkIssue {
  file: string
  href: string
  text: string
  reason: string
}

interface ExtractedLink {
  href: string
  text: string
  kind: 'link' | 'image'
}

interface ParsedDoc {
  file: string
  sectionIds: Set<string>
  links: ExtractedLink[]
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const collectSectionsAndLinks = (
  nodes: unknown[],
  sectionIds: Set<string>,
  links: ExtractedLink[],
) => {
  for (const node of nodes) {
    if (!isRecord(node)) {
      continue
    }

    const type = typeof node.type === 'string' ? node.type : ''

    if (type === 'code' || type === 'codespan') {
      continue
    }

    if (type === 'section' && typeof node.id === 'string' && node.id) {
      sectionIds.add(node.id)
    }

    if (type === 'link' && typeof node.href === 'string') {
      links.push({
        href: node.href,
        text: typeof node.text === 'string' ? node.text : '',
        kind: 'link',
      })
    }

    if (
      (type === 'image' || type === 'image-static') &&
      typeof node.href === 'string'
    ) {
      links.push({
        href: node.href,
        text: typeof node.text === 'string' ? node.text : '',
        kind: 'image',
      })
      if (typeof node.linkUrl === 'string' && node.linkUrl) {
        links.push({
          href: node.linkUrl,
          text: typeof node.text === 'string' ? node.text : '',
          kind: 'link',
        })
      }
    }

    if (type === 'project-example') {
      if (typeof node.imageUrl === 'string' && node.imageUrl) {
        links.push({
          href: node.imageUrl,
          text: typeof node.title === 'string' ? node.title : '',
          kind: 'image',
        })
      }
      if (typeof node.linkUrl === 'string' && node.linkUrl) {
        links.push({
          href: node.linkUrl,
          text: typeof node.title === 'string' ? node.title : '',
          kind: 'link',
        })
      }
    }

    if (Array.isArray(node.tokens)) {
      collectSectionsAndLinks(node.tokens, sectionIds, links)
    }

    if (Array.isArray(node.items)) {
      collectSectionsAndLinks(node.items, sectionIds, links)
    }

    if (type === 'table') {
      if (Array.isArray(node.header)) {
        collectSectionsAndLinks(node.header, sectionIds, links)
      }
      if (Array.isArray(node.rows)) {
        for (const row of node.rows) {
          if (Array.isArray(row)) {
            collectSectionsAndLinks(row, sectionIds, links)
          }
        }
      }
    }
  }
}

export const parseMarkdownDoc = (markdown: string, relativeFile: string) => {
  const parsed = parseRawContent({
    text: markdown,
    path: relativeFile,
    title: relativeFile,
  })
  const sectionIds = new Set<string>()
  const links: ExtractedLink[] = []

  collectSectionsAndLinks(parsed?.content ?? [], sectionIds, links)

  return {
    file: relativeFile,
    sectionIds,
    links,
  } satisfies ParsedDoc
}

export const getRouteMap = (structure: MenuItemsStructure) => {
  const routeMap = new Map<string, string>()

  for (const item of structure) {
    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        const route = `/${item.path}/${child.path}`
        routeMap.set(route, `${item.path}/${child.path}/index.md`)
      }
    } else {
      const route = `/${item.path}`
      routeMap.set(route, `${item.path}/index.md`)
    }
  }

  return routeMap
}

const findMarkdownFiles = (rootDir: string, currentDir = rootDir) => {
  const results: string[] = []
  const entries = fs.readdirSync(currentDir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name)
    if (entry.isDirectory()) {
      results.push(...findMarkdownFiles(rootDir, fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(path.relative(rootDir, fullPath).split(path.sep).join('/'))
    }
  }

  return results.sort()
}

const safeDecode = (value: string) => {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const GENERATED_REFERENCE_FILES = new Set([
  'references/actions/index.md',
  'references/formulas/index.md',
])

const GENERATED_REFERENCE_ROUTES = new Set([
  '/references/actions',
  '/references/formulas',
])

export const checkDocsLinks = ({
  docsDir,
  assetsDir = docsDir,
  structure,
  checkGeneratedRefs = false,
}: {
  docsDir: string
  assetsDir?: string
  structure: MenuItemsStructure
  checkGeneratedRefs?: boolean
}) => {
  const issues: LinkIssue[] = []
  const routeMap = getRouteMap(structure)

  for (const [route, relativeFile] of routeMap.entries()) {
    const absolutePath = path.join(docsDir, relativeFile)
    if (!fs.existsSync(absolutePath)) {
      issues.push({
        file: 'docs/index.json',
        href: route,
        text: route,
        reason: `Route listed in docs/index.json points to missing file "${relativeFile}"`,
      })
    }
  }

  const markdownFiles = findMarkdownFiles(docsDir)
  const parsedDocs = new Map<string, ParsedDoc>()

  for (const relativeFile of markdownFiles) {
    const content = fs.readFileSync(path.join(docsDir, relativeFile), 'utf-8')
    parsedDocs.set(relativeFile, parseMarkdownDoc(content, relativeFile))
  }

  for (const doc of parsedDocs.values()) {
    for (const link of doc.links) {
      const href = link.href.trim()

      if (!href) {
        if (checkGeneratedRefs && GENERATED_REFERENCE_FILES.has(doc.file)) {
          continue
        }
        issues.push({
          file: doc.file,
          href,
          text: link.text,
          reason: `Empty ${link.kind} destination`,
        })
        continue
      }

      if (EXTERNAL_SCHEME_REGEX.test(href)) {
        continue
      }

      if (link.kind === 'image') {
        if (href.startsWith('data:')) {
          continue
        }
        const imagePath = href.startsWith('/')
          ? path.join(assetsDir, href.slice(1))
          : path.join(assetsDir, path.dirname(doc.file), href)
        if (!fs.existsSync(imagePath)) {
          issues.push({
            file: doc.file,
            href,
            text: link.text,
            reason: `Image file not found: "${href}"`,
          })
        }
        continue
      }

      if (href.startsWith('#')) {
        const fragment = href.slice(1)
        if (!fragment || fragment.startsWith('#')) {
          issues.push({
            file: doc.file,
            href,
            text: link.text,
            reason: `Malformed anchor "${href}"`,
          })
          continue
        }
        const decodedFragment = safeDecode(fragment)
        if (!doc.sectionIds.has(decodedFragment)) {
          issues.push({
            file: doc.file,
            href,
            text: link.text,
            reason: `Section anchor "#${decodedFragment}" not found in "${doc.file}"`,
          })
        }
        continue
      }

      if (!href.startsWith('/')) {
        issues.push({
          file: doc.file,
          href,
          text: link.text,
          reason: `Internal link "${href}" should be root-relative (starting with "/") or an anchor ("#...")`,
        })
        continue
      }

      const hashIndex = href.indexOf('#')
      const rawPathWithQuery =
        hashIndex === -1 ? href : href.slice(0, hashIndex)
      const fragment = hashIndex === -1 ? undefined : href.slice(hashIndex + 1)
      const queryIndex = rawPathWithQuery.indexOf('?')
      const rawPath =
        queryIndex === -1
          ? rawPathWithQuery
          : rawPathWithQuery.slice(0, queryIndex)
      const normalizedPath =
        rawPath.length > 1 && rawPath.endsWith('/')
          ? rawPath.slice(0, -1)
          : rawPath

      const targetFile = routeMap.get(normalizedPath)
      if (!targetFile) {
        issues.push({
          file: doc.file,
          href,
          text: link.text,
          reason: `Target page "${normalizedPath}" does not exist in docs/index.json`,
        })
        continue
      }

      const targetDoc = parsedDocs.get(targetFile)
      if (!targetDoc) {
        issues.push({
          file: doc.file,
          href,
          text: link.text,
          reason: `Target markdown file "${targetFile}" not found`,
        })
        continue
      }

      if (fragment !== undefined) {
        if (!fragment || fragment.startsWith('#')) {
          issues.push({
            file: doc.file,
            href,
            text: link.text,
            reason: `Malformed anchor in "${href}"`,
          })
          continue
        }

        const decodedFragment = safeDecode(fragment)
        if (
          !checkGeneratedRefs &&
          GENERATED_REFERENCE_ROUTES.has(normalizedPath) &&
          !targetDoc.sectionIds.has(decodedFragment)
        ) {
          continue
        }

        if (!targetDoc.sectionIds.has(decodedFragment)) {
          issues.push({
            file: doc.file,
            href,
            text: link.text,
            reason: `Section anchor "#${decodedFragment}" not found in "${targetFile}"`,
          })
        }
      }
    }
  }

  return issues
}

const main = () => {
  const args = process.argv.slice(2)
  const useDist = args.includes('--dist')
  const rootDocsDir = path.resolve(__dirname, '../../docs')
  const distDocsDir = path.resolve(__dirname, '../dist/docs')
  const docsDir = useDist ? distDocsDir : rootDocsDir

  if (!fs.existsSync(docsDir)) {
    // eslint-disable-next-line no-console
    console.error(`Docs directory not found: ${docsDir}`)
    process.exit(1)
  }

  const structure = JSON.parse(
    fs.readFileSync(path.join(rootDocsDir, 'index.json'), 'utf-8'),
  ) as MenuItemsStructure

  const issues = checkDocsLinks({
    docsDir,
    assetsDir: rootDocsDir,
    structure,
    checkGeneratedRefs: useDist,
  })

  if (issues.length > 0) {
    // eslint-disable-next-line no-console
    console.error(`Found ${issues.length} broken link(s):`)
    for (const issue of issues) {
      // eslint-disable-next-line no-console
      console.error(
        `- ${issue.file}: [${issue.text}](${issue.href}) -> ${issue.reason}`,
      )
    }
    process.exit(1)
  }

  // eslint-disable-next-line no-console
  console.log(
    `All internal links verified (${useDist ? 'dist/docs' : 'docs'}).`,
  )
}

if (import.meta.main) {
  main()
}
