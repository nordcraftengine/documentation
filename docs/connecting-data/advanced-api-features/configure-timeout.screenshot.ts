import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for configure-timeout.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-call-an-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Weather%2520API&rightpanel=style',
  description: 'Configure timeout',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('tab', { name: 'Advanced' }).click()
    await page.waitForTimeout(100)
  },
  annotations: [
    {
      type: 'box',
      x: 429,
      y: 376,
      width: 251,
      height: 15,
      rx: 4
    }
  ],
})
