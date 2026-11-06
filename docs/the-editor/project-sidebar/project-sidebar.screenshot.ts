import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&leftpanel=pages',
  description: 'Project sidebar showing 3.0 activity bar with file categories',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
