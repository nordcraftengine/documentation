import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/actions/confetti?rightpanel=style&canvas-width=800&canvas-height=800&leftpanel=actions',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
