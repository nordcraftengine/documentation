import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Contentful&rightpanel=style',
  description: 'Service editor menu with detach service',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.locator('#api-editor-action-menu').click()
  },
})
