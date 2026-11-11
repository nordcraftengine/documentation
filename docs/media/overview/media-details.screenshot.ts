import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/media/e102cdfb-5bca-4b15-8a5c-cd05ec2d5b7c?mode=design&canvas-tool=select&canvas-width=800&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
})
