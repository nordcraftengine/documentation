import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/ship/changes?canvas-width=800&canvas-height=800',
  description: 'Ship mode / version control changes dock',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
