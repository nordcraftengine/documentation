import { readFileSync } from 'fs'
import * as prettier from 'prettier'

interface JsonAction {
  id: string
  action: {
    name: string
    description?: string
    arguments: Array<ActionArgument>
    deprecated?: boolean
    supercededBy?: string
  }
}

interface ActionArgument {
  name: string
  type?: { type: string }
  formula: any
  description?: string
}

export const includeActions = async (content: string) => {
  try {
    const actions = await fetch('https://api.nordcraft.com/lib/actions.json')
    const actionsJson = await actions.json<Array<JsonAction>>()
    const actionTemplate = readFileSync(`${__dirname}/action.md`, 'utf-8')
    const argumentsTemplate = readFileSync(
      `${__dirname}/arguments.md`,
      'utf-8',
    ).trim()
    const argumentTemplate = readFileSync(
      `${__dirname}/argument.md`,
      'utf-8',
    ).trim()
    const updatedContent = `\
${content.trim()}

${actionsJson
  .map((action) => {
    let description = action.action.deprecated ? '**Deprecated**: ' : ''
    if (action.action.supercededBy) {
      description += `Use [${action.action.supercededBy}](/references/actions#${encodeURIComponent(action.action.supercededBy)}) instead. `
    }
    description += action.action.description ?? ''
    let actionContent = actionTemplate
      .replace('{{ name }}', `~~${action.action.name}~~`)
      .replace('{{ description }}', description.trim())
    if (action.action.arguments.length > 0) {
      actionContent += '\n' + argumentsTemplate + '\n'
      actionContent += action.action.arguments
        .map((arg) => {
          return argumentTemplate
            .replace('{{ name }}', arg.name)
            .replace('{{ type }}', arg.type?.type ?? '')
            .replace('{{ description }}', arg.description ?? '')
        })
        .join('\n')
    }
    return actionContent
  })
  .join('\n')}
`
    return await prettier.format(updatedContent, { parser: 'markdown' })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error including actions:', error)
    return content
  }
}
