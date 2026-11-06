import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800',
  description: 'Command palette open in action mode',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.keyboard.press('Escape')
    await page.waitForTimeout(500)
    await page.keyboard.press('Meta+Shift+k')
    await page.waitForSelector('#quick-actions-input', { timeout: 5000 })
    await page.waitForTimeout(800)
  },
})
