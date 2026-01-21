import * as fs from 'fs'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { parseRawContent } from '../src/utils'

const execPromise = promisify(exec)

interface DocEntry {
  path: string
  label: string
  children?: DocEntry[]
}

interface MarkdownContent {
  type:
    | 'paragraph'
    | 'image-static'
    | 'space'
    | 'section'
    | 'heading'
    | 'text'
    | 'strong'
    | 'em'
    | 'list'
    | 'list_item'
    | 'link'
    | 'callout'
    | 'project-example'
    | 'codespan'
    | 'youtube'
    | 'html'
    | 'kbd'
    | 'image'
    | 'example'
    | 'code'
    | 'escape'
    | 'table'
  raw: string
  text?: string
  tokens?: MarkdownContent[]
  items?: MarkdownContent[]
  id?: string
}

enum ContentType {
  paragraph = 'paragraph',
  section = 'section',
  heading = 'heading',
  list = 'list',
  list_item = 'list_item',
  callout = 'callout',
  codespan = 'codespan',
  kbd = 'kbd',
  example = 'example',
  code = 'code',
  table = 'table',
}

interface ContentEntry {
  type: ContentType
  text?: string
  anchor?: string
  tokens?: ContentEntry[]
}

const getFullContent = async () => {
  const indexJsonPath = '../docs/index.json'
  if (!fs.existsSync(indexJsonPath)) {
    throw new Error(`File not found: ${indexJsonPath}`)
  }

  const indexContent = fs.readFileSync(indexJsonPath, 'utf-8')
  const docs: DocEntry[] = JSON.parse(indexContent)

  const allContent: {
    title: string
    description?: string
    lastUpdated?: string
    url: string
    content: ContentEntry[]
  }[] = []

  const processEntry = async (entry: DocEntry, parentPath = '') => {
    const currentPath = parentPath ? `${parentPath}/${entry.path}` : entry.path
    const mdPathRelative = `${currentPath}/index.md`
    const mdPathAbsolute = `../docs/${mdPathRelative}`

    if (fs.existsSync(mdPathAbsolute)) {
      const text = fs.readFileSync(mdPathAbsolute, 'utf-8')

      let lastUpdated = ''
      try {
        const { stdout } = await execPromise(
          `git log -1 --format="%ad" --date=iso "${mdPathAbsolute}"`,
        )
        lastUpdated = stdout.trim()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`Failed to get git log for ${mdPathAbsolute}:`, err)
      }

      const parsed: {
        seo: { title?: string; description?: string }
        content: MarkdownContent[]
      } = parseRawContent({
        path: mdPathRelative,
        text,
        title: entry.label,
      })

      allContent.push({
        title: parsed.seo.title ?? entry.label,
        description: parsed.seo.description,
        url: `https://docs.nordcraft.com/${currentPath}`,
        content: mapMarkdownToContentEntry(parsed.content),
        lastUpdated,
      })
    }

    if (entry.children) {
      for (const child of entry.children) {
        await processEntry(child, currentPath)
      }
    }
  }

  for (const entry of docs) {
    await processEntry(entry)
  }

  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist')
  }

  const outputPath = './dist/full-docs.json'
  fs.writeFileSync(outputPath, JSON.stringify(allContent, null, 2))
  // eslint-disable-next-line no-console
  console.log(`Successfully combined documentation into ${outputPath}`)
}

getFullContent().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})

// Recursive function to map MarkdownContent[] to ContentEntry[]
function mapMarkdownToContentEntry(
  contents?: MarkdownContent[],
): ContentEntry[] {
  if (!contents) {
    return []
  }
  return contents.reduce<ContentEntry[]>((acc, item) => {
    if (!Object.values(ContentType).includes(item.type as ContentType)) {
      return acc
    }
    const tokens = mapMarkdownToContentEntry(item.tokens ?? item.items)
    const mapped: ContentEntry = {
      type: item.type as ContentType,
      text: item.text,
      tokens: tokens.length > 0 ? tokens : undefined,
      anchor: item.id ? `#${item.id}` : undefined,
    }
    acc.push(mapped)
    return acc
  }, [])
}
