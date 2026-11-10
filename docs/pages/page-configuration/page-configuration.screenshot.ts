import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?mode=design&canvas-tool=select&canvas-width=800&selection=route&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
