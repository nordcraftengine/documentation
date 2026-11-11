import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/card?mode=design&canvas-tool=select&canvas-width=800&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Services' }).click()
    await page.locator('#sidebar-files-create-services').click()
    await page.waitForTimeout(500)
  },
  annotations: [
    { type: 'badge', x: 16, y: 58, text: '1' },
    { type: 'badge', x: 135, y: 24, text: '2' },
    { type: 'badge', x: 350, y: 141, text: '3' },
  ],
})
