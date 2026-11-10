import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'badge',
      x: 375,
      y: 395,
      text: '1',
    },
    {
      type: 'badge',
      x: 430,
      y: 395,
      text: '2',
    },
  ],
})
