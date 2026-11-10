import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&ai=open',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.locator('#nc-assistant-mode-picker').click()
    await page.waitForTimeout(500)
  },
})
