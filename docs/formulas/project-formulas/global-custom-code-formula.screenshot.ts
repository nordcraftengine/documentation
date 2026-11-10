import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/formulas/hasValue?canvas-height=800&canvas-width=800&rightpanel=attributes',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
