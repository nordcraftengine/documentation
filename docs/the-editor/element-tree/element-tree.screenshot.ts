import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for element-tree.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?mode=design&selection=nodes.root&rightpanel=style&canvas-tool=select&canvas-width=800',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'text',
      x: 136,
      y: 24,
      text: 'Element tree'
    }
  ],
})
