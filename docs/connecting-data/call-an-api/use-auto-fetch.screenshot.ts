import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for use-auto-fetch.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-call-an-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Weather%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'badge',
      x: 725,
      y: 107,
      text: '1'
    },
    {
      type: 'badge',
      x: 646,
      y: 76,
      text: '2'
    },
    {
      type: 'badge',
      x: 668,
      y: 76,
      text: '3'
    }
  ],
})
