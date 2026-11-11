import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for element-catalog.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?mode=design&canvas-tool=select&canvas-width=800&selection=nodes.root&rightpanel=style&elementCatalog=true',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
