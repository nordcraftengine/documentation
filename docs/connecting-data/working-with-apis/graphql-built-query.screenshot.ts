import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for graphql-built-query.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-handle-api-callback?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Pre-filled%2520Countries%2520GraphQL%2520API&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
