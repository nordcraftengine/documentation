import markdown from '@eslint/markdown'
import { defineConfig } from 'eslint/config'

export default defineConfig({
  files: ['docs/**/*.md', 'proxy/bin/**/*.md'],
  plugins: {
    markdown,
  },
  language: 'markdown/commonmark',
  rules: {
    'markdown/no-html': 'warn',
    'markdown/no-duplicate-headings': 'error',
    'markdown/fenced-code-language': 'error',
    'markdown/heading-increment': 'error',
    'markdown/no-empty-links': 'error',
    'markdown/no-invalid-label-refs': 'error',
  },
})
