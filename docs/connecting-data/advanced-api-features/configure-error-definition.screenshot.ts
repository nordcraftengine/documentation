import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for configure-error-definition.webp
// TODO: Review path, setup, and annotations to regenerate
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-call-an-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Weather%2520API&rightpanel=style',
  description: 'Configure error definition',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('tab', { name: 'Advanced' }).click()
    await page.waitForTimeout(100)
  },
  annotations: [
    {
      type: 'box',
      x: 666,
      y: 120,
      width: 16,
      height: 16,
      rx: 4
    },
    {
      type: 'badge',
      x: 687,
      y: 117,
      text: '1'
    }
  ],
})
