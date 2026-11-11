import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for page.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?mode=design&canvas-tool=select&rightpanel=attributes',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
