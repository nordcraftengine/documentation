import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for add-authorization-header.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-call-an-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Weather%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('tab', { name: 'Events' }).click()
    await page
      .getByRole('button', { name: 'Edit workflow for the event: success' })
      .click()
    await page.waitForTimeout(200)
  },
  annotations: [
    {
      type: 'badge',
      x: 405,
      y: 101,
      text: '1'
    },
    {
      type: 'box',
      x: 429,
      y: 103,
      width: 39,
      height: 15,
      rx: 4
    },
    {
      type: 'badge',
      x: 520,
      y: 99,
      text: '2'
    },
    {
      type: 'badge',
      x: 678,
      y: 132,
      text: '3'
    },
    {
      type: 'badge',
      x: 520,
      y: 222,
      text: '4'
    }
  ],
})
