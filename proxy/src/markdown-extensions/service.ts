import type { TokenizerAndRendererExtension } from 'marked'

export type ServiceToken = {
  type: 'service'
  name: string
  dataType: string
  supportedApis: string[]
  description: string
  slug: string
  logoUrl: string
  raw: string
}

export const serviceExtension: TokenizerAndRendererExtension = {
  name: 'service',
  level: 'block',

  tokenizer(src: string) {
    const match = src.match(/^@@@\s*service\s*\n([\s\S]*?)(?:\n@@@|\n?$)/)

    if (match) {
      const [fullMatch, content] = match

      // Parse parameters from the content
      const nameMatch = content.match(/name:\s*([^\n]+)/)
      const dataTypeMatch = content.match(/dataType:\s*([^\n]+)/)
      const supportedApisMatch = content.match(/supportedApis:\s*([^\n]+)/)
      const logoUrlMatch = content.match(/logoUrl:\s*([^\n]+)/)
      const descriptionMatch = content.match(/description:\s*([^\n]+)/)
      const slugMatch = content.match(/slug:\s*([^\n]+)/)

      return {
        type: 'service',
        name: nameMatch ? nameMatch[1].trim() : '',
        dataType: dataTypeMatch ? dataTypeMatch[1].trim() : '',
        supportedApis: supportedApisMatch
          ? supportedApisMatch[1]
              .split(',')
              .map((value) => value.trim())
              .filter(Boolean)
          : [],
        description: descriptionMatch ? descriptionMatch[1].trim() : '',
        slug: slugMatch ? slugMatch[1].trim() : '',
        logoUrl: logoUrlMatch ? logoUrlMatch[1].trim() : '',
        raw: fullMatch,
      } as ServiceToken
    }

    return undefined
  },

  renderer(_token) {
    return '' // No need to render it.
  },
}
