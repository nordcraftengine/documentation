import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for parse-response.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-call-an-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Weather%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('tab', { name: 'Advanced' }).click()
  },
  annotations: [
    {
      type: 'box',
      x: 584,
      y: 84,
      width: 43,
      height: 13,
      rx: 4
    },
    {
      type: 'badge',
      x: 631,
      y: 80,
      text: '1'
    },
    {
      type: 'badge',
      x: 406,
      y: 300,
      text: '2'
    }
  ],
})
