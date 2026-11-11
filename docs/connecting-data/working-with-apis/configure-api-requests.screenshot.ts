import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for configure-api-requests.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-call-an-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Weather%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'badge',
      x: 406,
      y: 60,
      text: '1'
    },
    {
      type: 'badge',
      x: 713,
      y: 106,
      text: '2'
    },
    {
      type: 'badge',
      x: 406,
      y: 82,
      text: '3'
    },
    {
      type: 'badge',
      x: 406,
      y: 176,
      text: '4'
    },
    {
      type: 'badge',
      x: 684,
      y: 60,
      text: '5'
    },
    {
      type: 'box',
      x: 429,
      y: 83,
      width: 200,
      height: 16,
      rx: 4
    },
    {
      type: 'box',
      x: 613,
      y: 61,
      width: 69,
      height: 17,
      rx: 4
    }
  ],
})
