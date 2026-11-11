import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for add-authorization-header.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-call-an-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Weather%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('tab', { name: 'Headers' }).click()
    await page.getByRole('button', { name: 'Add header' }).click()
    await page.getByText('Authorization').click()
    await page.getByText('Weather APIRequestMethodGETAuto').click()
    await page.waitForTimeout(100)
  },
  annotations: [
    {
      type: 'box',
      x: 668,
      y: 105,
      width: 12,
      height: 12,
      rx: 4,
    },
    {
      type: 'badge',
      x: 737,
      y: 105,
      text: '1',
    },
    {
      type: 'badge',
      x: 644,
      y: 98,
      text: '2',
    },
    {
      type: 'badge',
      x: 434,
      y: 136,
      text: '3',
    },
    {
      type: 'badge',
      x: 495,
      y: 136,
      text: '4',
    },
  ],
})
