import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for show-hide-formula.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-show-hide-formula?mode=design&canvas-tool=select&canvas-width=800&selection=nodes.nQgi8KJ7OPxn9l5H0mML-.condition&rightpanel=attributes',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.locator('#formula-editor').click()
    await page.waitForTimeout(200)
  },
  annotations: [
    {
      type: 'badge',
      x: 135,
      y: 67,
      text: '1'
    },
    {
      type: 'badge',
      x: 666,
      y: 134,
      text: '2'
    },
    {
      type: 'badge',
      x: 455,
      y: 265,
      text: '3'
    }
  ],
})
