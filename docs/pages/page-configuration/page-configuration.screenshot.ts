import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&selection=route&rightpanel=style',
  description: 'Page configuration panel',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
