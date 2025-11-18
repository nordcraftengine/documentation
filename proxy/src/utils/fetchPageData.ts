import type { Token } from 'marked'
import { marked } from 'marked'
import {
  calloutExtension,
  exampleExtension,
  imageExtension,
  ImageStaticExtension,
  kbdExtension,
  projectExampleExtension,
  youtubeExtension,
} from '../markdown-extensions'
import type { FetchPageData, PageData } from '../types'
import { getFrontMatter } from './frontMatter'
import { kebabCase } from './helpers'

marked.use({
  extensions: [
    calloutExtension,
    exampleExtension,
    kbdExtension,
    imageExtension,
    ImageStaticExtension,
    youtubeExtension,
    projectExampleExtension,
  ],
})

export const fetchPageData = async ({
  path,
  title,
}: FetchPageData): Promise<PageData> => {
  const response = await fetch(path)

  if (!response.ok) {
    throw new Error(`Could not fetch page data from path: ${path}`)
  }

  const text = await response.text()
  return parseRawContent({ path, text, title })
}

export const parseRawContent = ({
  path,
  text,
  title,
}: {
  text: string
  path: string
  title: string
}) => {
  const { attributes: metaFromMarkdown, body: markdown } = getFrontMatter(text)

  const tokens = getProcessedTokens(marked.lexer(markdown))

  const seo = {
    ...(metaFromMarkdown as object),
  }

  const formattedTitle = title.replaceAll('nordcraft', 'Nordcraft')

  const meta = {
    title: formattedTitle,
    folder: path.replace('index.md', ''),
  }

  return { seo, meta, content: getTokensAsSections(tokens as Token[], 1) }
}

const getProcessedTokens = (tokens: any[]) => {
  return tokens.map((token) => {
    const processedToken = { ...token } as any

    if (token.type === 'image' && token.text?.includes('|')) {
      const parts = token.text.split('|')
      processedToken.text = parts[0]
      processedToken.aspectRatio = parts[1]
    }

    if (token.type === 'image' || token.type === 'image-static') {
      const firstSpaceIndex = token.href.indexOf(' ')
      if (firstSpaceIndex !== -1) {
        processedToken.href = token.href.substring(0, firstSpaceIndex)
        processedToken.title = token.href
          .substring(firstSpaceIndex + 1)
          .replaceAll("'", '')
      }
    }

    if (token.tokens) {
      processedToken.tokens = getProcessedTokens(token.tokens)
    }

    return processedToken
  })
}

const getTokensAsSections = (
  _tokens: Token[],
  depth: number,
  previousId?: string,
) => {
  const tokens = _tokens.slice()
  const processedTokens: any[] = []

  const processToken = (index: number) => {
    const currentToken = tokens[index]
    let nextTokenIndex = index + 1

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (currentToken?.type === 'heading') {
      const id = getSectionId(currentToken.text, previousId)
      const nextHeadingIndex = getNextHeadingSliceIndex(tokens, index + 1)

      processedTokens.push({
        type: 'section',
        title: {
          type: currentToken.type,
          tokens: currentToken.tokens ?? [],
          raw: currentToken.raw,
          text: currentToken.text,
          depth: currentToken.depth,
        },
        id,
        depth: currentToken.depth,
        tokens:
          nextHeadingIndex === -1
            ? getTokensAsSections(
                tokens.slice(index + 1, tokens.length),
                currentToken.depth + 1,
                id,
              )
            : getTokensAsSections(
                tokens.slice(index + 1, nextHeadingIndex),
                currentToken.depth + 1,
                id,
              ),
      })

      nextTokenIndex = nextHeadingIndex
    } else if (currentToken) {
      processedTokens.push(currentToken)
    }

    if (nextTokenIndex !== -1 && nextTokenIndex < tokens.length) {
      processToken(nextTokenIndex)
    }
  }

  processToken(0)

  return processedTokens
}

const getNextHeadingSliceIndex = (tokens: Token[], start: number) => {
  return tokens.findIndex(
    (token, index) => token.type === 'heading' && index >= start,
  )
}

export const getSectionId = (name: string, previousId?: string) => {
  return previousId ? previousId + '-' + kebabCase(name) : kebabCase(name)
}
