import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for packages-overview.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/packages/confetti?mode=design&canvas-tool=select&canvas-width=800&leftpanel=packages&rightpanel=attributes',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
