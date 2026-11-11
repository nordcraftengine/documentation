import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for configure-a-redirect-rule.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-call-an-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Weather%2520API&rightpanel=events',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('tab', { name: 'Advanced' }).click()
    await page
      .getByRole('button', { name: 'Edit formula for To login' })
      .click()
  },
  annotations: [
    {
      type: 'badge',
      x: 683,
      y: 138,
      text: '1',
    },
    {
      type: 'badge',
      x: 445,
      y: 173,
      text: '2',
    },
    {
      type: 'badge',
      x: 450,
      y: 257,
      text: '3',
    },
  ],
})
