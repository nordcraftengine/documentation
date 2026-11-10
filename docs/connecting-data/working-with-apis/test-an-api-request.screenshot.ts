import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for test-an-api-request.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-handle-api-callback?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Weather%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'badge',
      x: 683,
      y: 175,
      text: '1'
    },
    {
      type: 'badge',
      x: 405,
      y: 176,
      text: '2'
    },
    {
      type: 'badge',
      x: 405,
      y: 208,
      text: '3'
    },
    {
      type: 'badge',
      x: 405,
      y: 252,
      text: '4'
    },
    {
      type: 'box',
      x: 667,
      y: 178,
      width: 13,
      height: 14,
      rx: 4
    }
  ],
})
