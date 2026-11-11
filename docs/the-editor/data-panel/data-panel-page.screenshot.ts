import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for data-panel-page.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?mode=design&canvas-tool=select&canvas-width=800&rightpanel=attributes',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'text',
      x: 584,
      y: 28,
      text: 'Data panel page '
    }
  ],
})
