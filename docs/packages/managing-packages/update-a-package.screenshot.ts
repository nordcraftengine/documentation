import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for update-a-package.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-map-formula?mode=design&canvas-tool=select&canvas-width=800&rightpanel=attributes&leftpanel=packages',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('tab', { name: 'Installed' }).click()
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'box',
      x: 93,
      y: 86,
      width: 19,
      height: 18,
      rx: 4,
    },
    {
      type: 'text',
      x: 94,
      y: 62,
      text: 'Update package ',
    },
    {
      type: 'text',
      x: 133,
      y: 143,
      text: 'Delete package ',
    },
    {
      type: 'box',
      x: 110,
      y: 144,
      width: 19,
      height: 20,
      rx: 4,
    },
  ],
})
