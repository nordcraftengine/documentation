import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for process-streamed-data.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-call-an-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Weather%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('tab', { name: 'Events' }).click()
  },
  annotations: [
    {
      type: 'box',
      x: 548,
      y: 83,
      width: 35,
      height: 15,
      rx: 4
    },
    {
      type: 'badge',
      x: 587,
      y: 80,
      text: '1'
    },
    {
      type: 'box',
      x: 665,
      y: 144,
      width: 18,
      height: 17,
      rx: 4
    },
    {
      type: 'badge',
      x: 686,
      y: 142,
      text: '2'
    }
  ],
})
