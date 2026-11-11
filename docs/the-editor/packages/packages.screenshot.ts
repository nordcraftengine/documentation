import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for packages.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?rightpanel=style&canvas-width=800&ai=open&leftpanel=packages',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
