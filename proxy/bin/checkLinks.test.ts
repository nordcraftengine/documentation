import { afterEach, describe, expect, test } from 'bun:test'
import * as fs from 'fs'
import os from 'os'
import path from 'path'
import type { MenuItemsStructure } from '../src/types'
import { checkDocsLinks } from './checkLinks'

const tempDirs: string[] = []

const createTempDocs = (files: Record<string, string>) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'check-links-test-'))
  tempDirs.push(dir)

  for (const [relativePath, content] of Object.entries(files)) {
    const fullPath = path.join(dir, relativePath)
    fs.mkdirSync(path.dirname(fullPath), { recursive: true })
    fs.writeFileSync(fullPath, content, 'utf-8')
  }

  return dir
}

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop()
    if (dir && fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  }
})

const baseStructure: MenuItemsStructure = [
  { path: 'about', label: 'About' },
  {
    path: 'guides',
    label: 'Guides',
    children: [
      { path: 'getting-started', label: 'Getting started' },
      { path: 'advanced', label: 'Advanced' },
    ],
  },
  {
    path: 'references',
    label: 'References',
    children: [{ path: 'actions', label: 'Actions' }],
  },
]

describe('checkDocsLinks', () => {
  test('passes for valid internal, anchor, external, and image links', () => {
    const docsDir = createTempDocs({
      'about/index.md': `# About

See [Getting started](/guides/getting-started) and [Installation](/guides/getting-started#installation).
Also see [Our mission](#our-mission), [Nordcraft](https://nordcraft.com), and [email](mailto:hi@example.com).

## Our mission

![Hero|16/9](hero.webp 'Hero')

\`\`\`markdown
[Ignored broken link](/does-not-exist#nope)
\`\`\`

Inline code \`[also ignored](/missing)\`.
`,
      'about/hero.webp': 'fake-webp',
      'guides/getting-started/index.md': `# Getting started

## Installation

Install instructions.
`,
      'guides/advanced/index.md': `# Advanced

| Feature | Link |
| --- | --- |
| About | [About](/about#our-mission) |

::: tip
Check [Actions](/references/actions#log-to-console) for details.
:::
`,
      'references/actions/index.md': `# Actions reference

Intro only before build.
`,
    })

    const issues = checkDocsLinks({
      docsDir,
      structure: baseStructure,
      checkGeneratedRefs: false,
    })

    expect(issues).toEqual([])
  })

  test('detects missing page routes and missing section anchors', () => {
    const docsDir = createTempDocs({
      'about/index.md': `# About

- [Missing page](/no-such-page)
- [Missing anchor on target](/guides/getting-started#missing-section)
- [Missing local anchor](#nope)
- [Double hash](/guides/getting-started##installation)
- [Relative link](guides/getting-started)
- [Missing image](missing.webp)
`,
      'guides/getting-started/index.md': `# Getting started

## Installation
`,
      'guides/advanced/index.md': '# Advanced\n',
      'references/actions/index.md': '# Actions\n',
    })

    const issues = checkDocsLinks({
      docsDir,
      structure: baseStructure,
    })

    expect(issues).toHaveLength(6)
    expect(issues.map((i) => i.href)).toEqual([
      '/no-such-page',
      '/guides/getting-started#missing-section',
      '#nope',
      '/guides/getting-started##installation',
      'guides/getting-started',
      'missing.webp',
    ])
  })

  test('validates generated reference anchors when checkGeneratedRefs is true', () => {
    const docsDir = createTempDocs({
      'about/index.md': `# About

- [Valid action](/references/actions#log-to-console)
- [Missing action](/references/actions#nonexistent-action)
`,
      'guides/getting-started/index.md': '# Getting started\n',
      'guides/advanced/index.md': '# Advanced\n',
      'references/actions/index.md': `# Actions

## Log to console
`,
    })

    const issues = checkDocsLinks({
      docsDir,
      structure: baseStructure,
      checkGeneratedRefs: true,
    })

    expect(issues).toHaveLength(1)
    expect(issues[0].href).toBe('/references/actions#nonexistent-action')
  })

  test('reports missing files declared in docs/index.json', () => {
    const docsDir = createTempDocs({
      'about/index.md': '# About\n',
      'guides/getting-started/index.md': '# Getting started\n',
      'references/actions/index.md': '# Actions\n',
    })

    const issues = checkDocsLinks({
      docsDir,
      structure: baseStructure,
    })

    expect(issues).toHaveLength(1)
    expect(issues[0].file).toBe('docs/index.json')
    expect(issues[0].href).toBe('/guides/advanced')
  })
})
