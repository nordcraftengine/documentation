import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for set-a-request-body.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-handle-api-callback?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Example%2520JSON%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('tab', { name: 'Body' }).click()
    await page.getByRole('button', { name: 'Edit formula for Body' }).click()
    await page.locator('#formula-editor').click() // blur
  },
  annotations: [
    {
      type: 'badge',
      x: 465,
      y: 40,
      text: '1',
    },
    {
      type: 'badge',
      x: 549,
      y: 61,
      text: '2',
    },
    {
      type: 'badge',
      x: 458,
      y: 250,
      text: '3',
    },
    {
      type: 'box',
      x: 429,
      y: 63,
      width: 83,
      height: 14,
      rx: 4,
    },
  ],
})
