import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for access-api-data.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-handle-api-callback?mode=design&canvas-tool=select&canvas-width=800&selection=nodes.rVORZmlwQvSBCbaGDUZfg.value&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.locator('#formula-canvas').click()
    await page.waitForTimeout(100)
  },
  annotations: [
    {
      type: 'badge',
      x: 74,
      y: 276,
      text: '1'
    },
    {
      type: 'badge',
      x: 190,
      y: 310,
      text: '2'
    }
  ],
})
