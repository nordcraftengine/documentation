import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?mode=design&canvas-tool=select&canvas-width=800&rightpanel=style',
  description: 'Connect service from API panel',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Connect API' }).click()
    await page.getByRole('button', { name: 'Connect new service' }).click()
    await page.waitForTimeout(300)
  },
  annotations: [
    { type: 'badge', x: 643, y: 82, text: '1' },
    { type: 'badge', x: 194, y: 17, text: '2' },
  ],
})
