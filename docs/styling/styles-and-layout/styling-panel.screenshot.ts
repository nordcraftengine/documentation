import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for styling-panel.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/card?mode=design&canvas-tool=select&canvas-width=800&selection=nodes.root&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
