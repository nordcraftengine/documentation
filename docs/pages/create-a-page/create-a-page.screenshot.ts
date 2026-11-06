import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&leftpanel=pages',
  description: 'Create page dialog open from pages drawer',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.evaluate(() => {
      const btn = document.querySelector(
        '[class*="sidebar-files:vz7XXhB7lnqyN7Z0ei9qX"]',
      ) as HTMLElement
      btn?.click()
    })
    await page.waitForTimeout(800)
  },
})
