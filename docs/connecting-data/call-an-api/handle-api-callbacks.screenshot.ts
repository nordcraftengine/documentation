import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for handle-api-callbacks.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-call-an-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Weather%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('tab', { name: 'Events' }).click()
  },
  annotations: [
    {
      type: 'box',
      x: 662,
      y: 100,
      width: 22,
      height: 61,
      rx: 4
    },
    {
      type: 'badge',
      x: 405,
      y: 101,
      text: '1'
    },
    {
      type: 'badge',
      x: 405,
      y: 122,
      text: '2'
    },
    {
      type: 'badge',
      x: 405,
      y: 143,
      text: '3'
    }
  ],
})
