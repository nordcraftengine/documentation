import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800',
  description: 'Version control button in sidebar activity bar',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
