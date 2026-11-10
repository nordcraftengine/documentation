import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for configure-a-request-url.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-call-an-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Weather%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'badge',
      x: 405,
      y: 102,
      text: '1'
    },
    {
      type: 'badge',
      x: 405,
      y: 138,
      text: '2'
    },
    {
      type: 'badge',
      x: 491,
      y: 59,
      text: '3'
    },
    {
      type: 'box',
      x: 483,
      y: 84,
      width: 35,
      height: 13,
      rx: 4
    }
  ],
})
