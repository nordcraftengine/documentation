import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/card?mode=design&canvas-tool=select&canvas-width=800&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Preview component' }).click()
    await page.getByRole('button', { name: 'Web component exported' }).click()
    await page.waitForTimeout(300)
  },
  annotations: [
    { type: 'badge', x: 187, y: 2, text: '1' },
    { type: 'badge', x: 666, y: 18, text: '2' },
    { type: 'badge', x: 128, y: 204, text: '3' },
    { type: 'badge', x: 128, y: 272, text: '4' },
  ],
})
