import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/card?mode=design&canvas-tool=select&selection=nodes.root&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
