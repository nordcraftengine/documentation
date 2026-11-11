import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for packages.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?rightpanel=style&canvas-width=800&ai=open&leftpanel=packages',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'box',
      x: 1,
      y: 398,
      width: 18,
      height: 17,
      rx: 4,
    },
  ],
})
