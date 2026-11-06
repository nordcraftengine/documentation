import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/services/connect-service?mode=design&leftpanel=services&canvas-tool=select&canvas-width=800&rightpanel=style',
  description: 'Configure Supabase service dialog',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.locator('[data-test="create-service-item-supabase"]').click()
    await page.waitForTimeout(300)
  },
})
