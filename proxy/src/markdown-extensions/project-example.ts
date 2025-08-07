import type { TokenizerAndRendererExtension } from 'marked'

export type ProjectExampleToken = {
  type: 'project-example'
  title: string
  description: string
  editorUrl: string
  imageUrl: string
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
      const editorUrlMatch = content.match(/editorUrl:\s*([^\n]+)/)
      const imageUrlMatch = content.match(/imageUrl:\s*([^\n]+)/)

      return {
        type: 'project-example',
        raw: fullMatch,
        title: titleMatch ? titleMatch[1].trim() : undefined,
        description: descriptionMatch ? descriptionMatch[1].trim() : undefined,
        editorUrl: editorUrlMatch ? editorUrlMatch[1].trim() : undefined,
        imageUrl: imageUrlMatch ? imageUrlMatch[1].trim() : undefined,
      } as ProjectExampleToken
    }

    return undefined
  },

  renderer(_token) {
    return '' // No need to render it.
  },
}
