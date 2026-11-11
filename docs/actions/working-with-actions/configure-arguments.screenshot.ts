import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/actions/confetti?rightpanel=style&canvas-width=800&canvas-height=800',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    { type: 'badge', x: 128, y: 20, text: '1' },
    { type: 'badge', x: 88, y: 40, text: '2' },
    { type: 'badge', x: 63, y: 58, text: '3' },
  ],
})
