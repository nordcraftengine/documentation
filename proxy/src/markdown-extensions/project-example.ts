import type { TokenizerAndRendererExtension } from 'marked'

export type ProjectExampleToken = {
  type: 'project-example'
  title: string
  description: string
  linkUrl: string
  imageUrl: string
  imageAltText: string
  raw: string
}

export const projectExampleExtension: TokenizerAndRendererExtension = {
  name: 'project-example',
  level: 'block',

  tokenizer(src: string) {
    const match = src.match(
      /^@@@\s*project-example\s*\n([\s\S]*?)(?:\n@@@|\n?$)/,
    )

    if (match) {
      const [fullMatch, content] = match

      // Parse parameters from the content
      const titleMatch = content.match(/title:\s*([^\n]+)/)
      const descriptionMatch = content.match(/description:\s*([^\n]+)/)
      const linkUrlMatch = content.match(/linkUrl:\s*([^\n]+)/)
      const imageUrlMatch = content.match(/imageUrl:\s*([^\n]+)/)
      const imageAltTextMatch = content.match(/imageAltText:\s*([^\n]+)/)

      return {
        type: 'project-example',
        title: titleMatch ? titleMatch[1].trim() : '',
        description: descriptionMatch ? descriptionMatch[1].trim() : '',
        linkUrl: linkUrlMatch ? linkUrlMatch[1].trim() : '',
        imageUrl: imageUrlMatch ? imageUrlMatch[1].trim() : '',
        imageAltText: imageAltTextMatch ? imageAltTextMatch[1].trim() : '',
        raw: fullMatch,
      } as ProjectExampleToken
    }

    return undefined
  },

  renderer(_token) {
    return '' // No need to render it.
  },
}
