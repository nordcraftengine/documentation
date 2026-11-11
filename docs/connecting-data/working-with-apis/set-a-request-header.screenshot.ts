import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for set-a-request-header.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-handle-api-callback?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Example%2520JSON%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('tab', { name: 'Headers' }).click()
  },
  annotations: [
    {
      type: 'box',
      x: 666,
      y: 104,
      width: 14,
      height: 14,
      rx: 4
    },
    {
      type: 'badge',
      x: 642,
      y: 101,
      text: '1'
    },
    {
      type: 'badge',
      x: 436,
      y: 136,
      text: '2'
    },
    {
      type: 'badge',
      x: 474,
      y: 136,
      text: '3'
    }
  ],
})
