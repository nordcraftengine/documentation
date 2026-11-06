import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/themes/Default',
  description: 'Theme variable grouping CTA',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
