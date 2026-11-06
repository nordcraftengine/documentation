import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?rightpanel=events&canvas-width=1077.6&canvas-height=800',
  description: 'Canvas workspace with responsive tools and controls',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.keyboard.press('Meta+I') // Switch to Interactive mode
    await page.waitForTimeout(500)
  },
})
