import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for configure-api-inputs.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-call-an-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Weather%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('tab', { name: 'Inputs' }).click()
    await page.waitForTimeout(100)
  },
  annotations: [
    {
      type: 'badge',
      x: 643,
      y: 101,
      text: '1'
    },
    {
      type: 'box',
      x: 666,
      y: 103,
      width: 15,
      height: 16,
      rx: 4
    }
  ],
})
