import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/services/Custom?mode=design&canvas-tool=select&canvas-width=800&leftpanel=services&rightpanel=style',
  description: 'Configure OpenAPI / custom service dialog',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    { type: 'badge', x: 600, y: 276, text: '1' },
    { type: 'badge', x: 475, y: 300, text: '2' },
  ],
})
