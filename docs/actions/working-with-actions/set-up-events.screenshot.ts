import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/actions/confetti?rightpanel=style&canvas-width=800&canvas-height=800',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    { type: 'badge', x: 135, y: 275, text: '1' },
    { type: 'badge', x: 105, y: 292, text: '2' },
    { type: 'badge', x: 72, y: 311, text: '3' },
  ],
})
