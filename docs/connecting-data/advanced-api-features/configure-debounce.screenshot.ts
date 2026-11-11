import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for configure-debounce.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-call-an-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Weather%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('tab', { name: 'Advanced' }).click()
    await page.locator('[id="api-Weather API-debounce"]').click()
    await page.waitForTimeout(200)
  },
  annotations: [
    {
      type: 'box',
      x: 429,
      y: 338,
      width: 253,
      height: 17,
      rx: 4
    }
  ],
})
