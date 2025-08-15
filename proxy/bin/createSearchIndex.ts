import * as fs from 'fs'
import { chunk } from 'lodash'
import { ImportError } from 'typesense/lib/Typesense/Errors'
import { getTypesenseClient } from '../src/search/typesense'
import { errorResponse, json, parseRawContent } from '../src/utils'
import { getFileLabel } from './fileTree'

interface ProcessedPage {
  sections: any[]
  path: string
  breadcrumbs: string[]
  filePath: string
  title: string
}

type SearchItem = SearchItemPage | SearchItemSection

type SearchItemPage = {
  type: 'page'
} & SearchItemBase

type SearchItemSection = {
  type: 'section'
  content: string
} & SearchItemBase

interface SearchItemBase {
  id: string
  title: string
  breadcrumbs: string[]
  path: string
  priority: number
}

const args = process.argv.slice(2)
const dryrun = Array.isArray(args) && args.includes('--dryrun')

const createSearchIndex = async () => {
  try {
    // Read all files
    const files = fs.readdirSync('./dist/docs', { recursive: true })
    const allPages = (files as string[])
      .filter((filePath) => filePath.endsWith('index.md'))
      .map((filePath) => {
        const pathParts = filePath
          .split('/')
          // Remove index.md
          .slice(0, -1)
        const breadcrumbs = pathParts.reduce<string[]>(
          (acc, _, i) => [
            ...acc,
            getFileLabel(
              pathParts.slice(0, i + 1).join('/'),
            ).toLocaleLowerCase(),
          ],
          [],
        )

        const path = breadcrumbs.join('/').replaceAll(' ', '-')

        const title = breadcrumbs[breadcrumbs.length - 1]

        const page = parseRawContent({
          text: fs.readFileSync(`./dist/docs/${filePath}`, 'utf-8'),
          path,
          title,
        })

        const data: ProcessedPage = {
          filePath,
          title,
          breadcrumbs,
          path,
          sections: page?.content ?? [],
        }

        return data
      })

    const searchItems = getSearchItemsFromPages(allPages)

    if (dryrun) {
      // eslint-disable-next-line no-console
      console.log({ searchItems })
      return
    }

    const apiKey = process.env.TYPESENSE_ADMIN_TOKEN
    const host = process.env.TYPESENSE_HOST
    if (!apiKey || !host) {
      throw new Error('TYPESENSE_ADMIN_TOKEN or TYPESENSE_HOST is not set')
    }
    const client = getTypesenseClient({
      apiKey,
      host,
      connectionTimeoutSeconds: 5 * 60,
    })
    try {
      // We remove all documents from the search index. The collection size is small. This should not be an issue.
      await client
        .collections('items')
        .documents()
        .delete({ filter_by: 'type:[page, section]' })
      const chunks = chunk(searchItems, 100)
      for (const chunkItems of chunks) {
        await client
          .collections('items')
          .documents()
          .import(chunkItems, { action: 'create' })
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error when updating search index', err)
      if (err instanceof ImportError) {
        // eslint-disable-next-line no-console
        console.error(err.importResults)
      }
    }

    return json({ indexedItems: searchItems.length })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return errorResponse('Could not fetch file list')
  }
}

const getSearchItemsFromPages = (pages: ProcessedPage[]) => {
  const items: SearchItem[] = []

  pages.forEach(({ path, breadcrumbs, title, sections }) => {
    items.push({
      id: 'page_' + path,
      type: 'page',
      title,
      breadcrumbs,
      path,
      priority: 0,
    })

    sections.forEach(({ title, id, tokens }) => {
      const content = getContentFromTokens(tokens)
      if (content.length > 0) {
        items.push({
          type: 'section',
          id: 'section_' + path + '#' + id,
          title,
          breadcrumbs,
          path: path + '#' + id,
          priority: 1,
          content: getContentFromTokens(tokens),
        })
      }
    })
  })

  return items
}

interface MdToken {
  type: string
  tokens: any[]
  text: string
  href?: string
  items?: MdToken[]
}

const getContentFromTokens = (tokens?: MdToken[]) => {
  let content = ''

  const allowedTokens = [
    'blockquote',
    'callout',
    'codespan',
    'em',
    'link',
    'list_item',
    'list',
    'paragraph',
    'strong',
    'text',
  ]

  ;(tokens ?? []).forEach((token) => {
    if (token.type === 'text' && (token.tokens ?? []).length === 0) {
      content += token.text
    } else if (allowedTokens.includes(token.type)) {
      if (token.type === 'link') {
        // To avoid md encoded links in the search index, we only include the name of the link
        content += token.text
      } else {
        content += getContentFromTokens(token.tokens ?? [])
        if (token.type === 'list') {
          ;(token.items ?? []).forEach((item) => {
            content += getContentFromTokens(item.tokens ?? [])
          })
        }
      }
    }
  })

  return content
}

await createSearchIndex()
