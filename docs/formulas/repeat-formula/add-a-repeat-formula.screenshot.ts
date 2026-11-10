import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for add-a-repeat-formula.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-repeat-formula?mode=design&canvas-tool=select&canvas-width=800&selection=nodes.nQgi8KJ7OPxn9l5H0mML-.repeat&rightpanel=attributes',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.locator('#formula-editor').click({ position: { x: 50, y: 50 } })
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'badge',
      x: 135,
      y: 67,
      text: '1',
    },
    {
      type: 'badge',
      x: 756,
      y: 153,
      text: '2',
    },
    {
      type: 'badge',
      x: 459,
      y: 246,
      text: '3',
    },
    {
      type: 'badge',
      x: 756,
      y: 175,
      text: '4',
    },
  ],
})
