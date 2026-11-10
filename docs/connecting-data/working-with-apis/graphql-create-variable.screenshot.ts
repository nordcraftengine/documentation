import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for graphql-create-variable.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-handle-api-callback?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Pre-filled%2520Countries%2520GraphQL%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page
      .getByText('USD', { exact: true })
      .locator('xpath=ancestor::button[1]/preceding-sibling::button[1]')
      .click()
    await page.waitForTimeout(100)
  },
  annotations: [
    {
      type: 'badge',
      x: 276,
      y: 190,
      text: '1'
    },
    {
      type: 'badge',
      x: 373,
      y: 210,
      text: '2A'
    },
    {
      type: 'badge',
      x: 373,
      y: 240,
      text: '2B'
    }
  ],
})
