import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for graphql-variable-formula-editor.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-handle-api-callback?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Pre-filled%2520Countries%2520GraphQL%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('tab', { name: 'Variables' }).click()
    await page.getByRole('button', { name: 'Edit formula for value' }).click()
    await page.locator('#formula-editor').click()
  },
  annotations: [
    {
      type: 'box',
      x: 393,
      y: 118,
      width: 18,
      height: 20,
      rx: 4
    }
  ],
})
